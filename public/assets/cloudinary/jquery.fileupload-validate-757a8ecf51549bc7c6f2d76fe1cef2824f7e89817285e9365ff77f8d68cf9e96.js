/*
 * jQuery File Upload Validation Plugin 1.1.2
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","./jquery.fileupload-process"],e):e(window.jQuery)}(function(e){"use strict";e.blueimp.fileupload.prototype.options.processQueue.push({action:"validate",always:!0,acceptFileTypes:"@",maxFileSize:"@",minFileSize:"@",maxNumberOfFiles:"@",disabled:"@disableValidation"}),e.widget("blueimp.fileupload",e.blueimp.fileupload,{options:{getNumberOfFiles:e.noop,messages:{maxNumberOfFiles:"Maximum number of files exceeded",acceptFileTypes:"File type not allowed",maxFileSize:"File is too large",minFileSize:"File is too small"}},processActions:{validate:function(i,l){if(l.disabled)return i;var r,s=e.Deferred(),t=this.options,o=i.files[i.index];return(l.minFileSize||l.maxFileSize)&&(r=o.size),"number"===e.type(l.maxNumberOfFiles)&&(t.getNumberOfFiles()||0)+i.files.length>l.maxNumberOfFiles?o.error=t.i18n("maxNumberOfFiles"):!l.acceptFileTypes||l.acceptFileTypes.test(o.type)||l.acceptFileTypes.test(o.name)?r>l.maxFileSize?o.error=t.i18n("maxFileSize"):"number"===e.type(r)&&r<l.minFileSize?o.error=t.i18n("minFileSize"):delete o.error:o.error=t.i18n("acceptFileTypes"),o.error||i.files.error?(i.files.error=!0,s.rejectWith(this,[i])):s.resolveWith(this,[i]),s.promise()}}})});