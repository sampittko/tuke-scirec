import React from 'react';
import Viewer from "./Viewer";
import Uploader from "./Uploader";
import {Divider} from "@material-ui/core";

const File = props =>
  <div>
    <Viewer/>
    <Divider/>
    <Uploader/>
  </div>;

export default File;