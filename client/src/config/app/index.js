export const APP_NAME = "SCIREC";

export const DOCUMENT_TITLE_BASE = APP_NAME + " •";

const MAX_STRING_LIMIT = 50;
const MAX_NOTES_LIMIT = 600;

export const userConfig = {
  INITIAL_DASHBOARDS_COUNT: 1,
  authProviders: {
    FACEBOOK: 0,
    TWITTER: 1,
    GITHUB: 2,
    GOOGLE: 3,
  }
};

export const dashboardConfig = {
  MIN_COUNT: 1,
  MAX_COUNT: 10,
  MIN_LENGTH: 3,
  MAX_LENGTH: 25,
  defaultValues: {
    TITLE: "Nástenka 1",
    theme: {
      ID: 0,
      INVERTED: false
    },
    DEFAULT: true
  }
};

export const projectConfig = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 80,
  MAX_DESCRIPTION_LENGTH: 200,
  MAX_RECIPIENT_LENGTH: MAX_STRING_LIMIT,
  MAX_DEADLINE_LENGTH: MAX_STRING_LIMIT,
  defaultValues: {
    meta: {
      VERSIONS_COUNT: 0,
      DELETED_VERSIONS_COUNT: 0,
    },
    overview: {
      STATE: 0,
      DEADLINE: '',
      DEADLINE_VISIBLE: true,
      DESCRIPTION: '',
      RECIPIENT: '',
    },
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
  MAX_NOTES_LENGTH: MAX_NOTES_LIMIT,
  defaultValues: {
    detail: {
      STATE: 0,
      NOTES: '',
    },
  },
  states: {
    values: {
      NOT_SET: 0,
      WORK_IN_PROGRESS: 1,
      WAITING_FOR_REVIEW: 2,
      REJECTED: 3,
      ACCEPTED: 4,
      DELETED: 5,
    },
    labels: {
      NOT_SET: 'nenastavený',
      WORK_IN_PROGRESS: 'práca prebieha',
      WAITING_FOR_REVIEW: 'čaká sa na posudok',
      REJECTED: 'odmietnutá',
      ACCEPTED: 'prijatá',
      DELETED: 'odstránená',
    }
  }
};

export const projectVersionReviewConfig = {
  MAX_NOTES_LENGTH: MAX_NOTES_LIMIT,
  defaultValues: {
    NOTES: '',
  },
};

export const fileConfig = {
  SUPPORTED_FORMATS: '*',
  MAX_FILES: 30,
  PROJECT_VERSION_FILES_INDEX: 0,
  MAX_NAME_LENGTH: MAX_STRING_LIMIT,
  MAX_SINGLE_FILE_SIZE_MB: 5,
};