export const APP_NAME = "SCIREC";

export const DOCUMENT_TITLE_BASE = APP_NAME + " -";

export const fileConfig = {
  SUPPORTED_FORMATS: '.zip, .rar, .pdf, .doc, .docx, .tex',
  MAX_FILES: 5,
};

export const dashboardConfig = {
  MAX_COUNT: 10,
  MIN_LENGTH: 3,
  MAX_LENGTH: 25,
  defaultDashboard: {
    TITLE: "Nástenka 1",
    THEME: {
      ID: 0,
      INVERTED: false
    },
    DEFAULT: true
  }
};

export const projectConfig = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 80,
  defaultValues: {
    STATE: 0,
    DEADLINE: '',
    DESCRIPTION: '',
    RECIPIENT: '',
    VERSIONS_COUNT: 0,
  },
  states: {
    values: {
      NOT_SET: 0,
      PENDING: 1,
      FINISHED: 2,
    },
    labels: {
      NOT_SET: 'nenastavený',
      PENDING: 'prebieha',
      FINISHED: 'dokončený',
    }
  }
};

export const projectVersionConfig = {
  states: {
    values: {
      NOT_SET: 0,
      WORK_IN_PROGRESS: 1,
      WAITING_FOR_REVIEW: 2,
      REJECTED: 3,
      ACCEPTED: 4,
    },
    labels: {
      NOT_SET: 'nenastavený',
      WORK_IN_PROGRESS: 'práca prebieha',
      WAITING_FOR_REVIEW: 'čaká sa na posudok',
      REJECTED: 'odmietnutá',
      ACCEPTED: 'prijatá',
    }
  }
};