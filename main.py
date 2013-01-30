import web
import urlparse
import fts.libftspython

urls = (
  '/', 'index',
  '/up', 'upload',
  '/upload/(.*)', 'uploadStore',
  '/transfer', 'transfer',
)

voms_db = {}
transfer_db = {}
jobid_db = {}

fts = fts.libftspython.Fts("itgt-fts-01.cern.ch:8443")

render = web.template.render('templates/')

class index:
  def GET(self):
    return render.index()

class upload:
  def GET(self):
    return render.upload()

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
      
class transfer:
  def GET(self):
    query_dict = dict(urlparse.parse_qsl(web.ctx.env['QUERY_STRING'])) 
    if ('source' and 'dest') in query_dict:
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
