// Liste des erreurs que l'API peut renvoyer

const list = {
  noHQsError: {
    code: 500,
    error: 'noHQsError',
    error_description: 'No headquarters in the database'
  },
  noHQError: {
    code: 500,
    error: 'noHQError',
    error_description: 'This headquarter doesn\'t exist'
  },
  noRIBsError: {
    code: 500,
    error: 'noRIBsError',
    error_description: 'No RIBs in the database'
  },
  noRIBError: {
    code: 500,
    error: 'noRIBError',
    error_description: 'This RIB doesn\'t exist'
  },
};

export default (err) => {
  if (err instanceof Error && err.message){
    return list[err.message] ? list[err.message] : { code: 500, error: 'UnknownError', error_description: 'Unknown error' };
  } else {
    return list[err] ? list[err] : { code: 500, error: 'UnknownError', error_description: 'Unknown error' };
  }
};