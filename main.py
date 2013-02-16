import fts
import gfal2
import json
import os
import urlparse
import web

from common import isValidStorageURL

urls = (
  '/', 'index',
  '/up', 'upload',
  '/upload/(.*)', 'uploadStore',
  '/transfer', 'transfer',
  '/fts', 'ftsConnect',
  '/storage', 'storageHandler',
)

voms_db = {}
transfer_db = {}
jobid_db = {}
ftsconnect_db = {}

render = web.template.render('templates/')
gfal = gfal2.creat_context()

class index:
  def GET(self):
    return render.index()

class upload:
  def GET(self):
    return render.upload()

class storageHandler:
  def GET(self):
    query_dict = dict(urlparse.parse_qsl(web.ctx.env['QUERY_STRING'])) 
    storageLocation = query_dict.get('location', '')

    if not isValidStorageURL(storageLocation.encode('ascii', 'ignore')):
      raise web.seeother('/')

    locationContents = gfal.listdir(storageLocation)

    web.header('Content-Type', 'application/json')
    return json.dumps(locationContents)

class uploadStore:
  def GET(self, filename):
    pass

  def POST(self, filename):
    data = web.data()
    voms_db[filename] = data
    print 'size of db entry =', len(voms_db[filename])
#    with open('data/'+filename, 'wb') as outfile:
#      outfile.write(data)

    return 'Successful upload'

class ftsConnect:
  def GET(self, filename):
    # write the proxy cert to a file
    certfilepath = '/tmp/'+filename
    with open(certfilepath, 'wb') as certfile:
      certfile.write(voms_db[filename])

    # point the env var X509_USER_PROXY to its place (i.e. /tmp/x509up_u<uid>) 
    os.environ['X509_USER_PROXY'] = certfilepath

    fts = fts.libftspython.Fts("https://itgt-fts-01.cern.ch:8443")
    ftsconnect_db['connection'] = fts

class transfer:
  def GET(self):
    query_dict = dict(urlparse.parse_qsl(web.ctx.env['QUERY_STRING'])) 
    if ('source' and 'dest') in query_dict:
      fts = ftsconnect_db['connection']

      src = query_dict['source']
      dst = query_dict['dest']
      file_pair = (src, dst)
      job1 = libftspython.Job(file)
      id1 = fts.submit(job1)
      jobid_db[id1] = job1
    else:
      print 'The parameters are not present:', query_dict

    raise web.seeother('/')

if __name__ == "__main__":
  app = web.application(urls, globals())
  app.run()
