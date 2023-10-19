export const filetypeGroups = {
  image:{
    'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.bmp'],
  },
  office:{
    'application/vnd.ms-powerpoint': ['.ppt'],
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
    'text/plain': ['.txt'],
    'application/pdf': ['.pdf'],
    'application/rtf': ['.rtf'],
    'application/epub+zip': ['.epub'],
    'application/msword': ['.doc'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    'text/csv': ['.csv'],
    'application/vnd.ms-excel': ['.xls'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  },
  archive:{
    'application/vnd.rar': ['.rar'],
    'application/x-tar': ['.tar'],
    'application/x-7z-compressed': ['.7z'],
    'application/zip': ['.zip'],
  },
  dev:{
    'application/json': ['.json'],
    'application/xml': ['.xml'],
  },
}

