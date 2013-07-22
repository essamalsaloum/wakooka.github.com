# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'sass', :input => 'css/scss', :output => 'css', :style => :compressed

guard 'jekyll' do
  watch /.*/
  ignore /_site/
end

 guard 'livereload' do
  watch(%r{.+\.(html|css|js|)})
end
