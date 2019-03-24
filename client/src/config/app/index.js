export const APP_NAME = "SCIREC";

export const DOCUMENT_TITLE_BASE = APP_NAME + " -";

export const SUPPORTED_FILE_TYPES = '.zip, .rar, .pdf, .doc, .docx, .tex';

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
};