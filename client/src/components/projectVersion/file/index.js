import React from 'react';
import Viewer from "./Viewer";
// import Uploader from "./Uploader";
import propTypes from 'prop-types';

const File = props =>
  <div>
    <Viewer editable={props.editable}/>
    {/*<Uploader editable={props.editable}/>*/}
  </div>;

File.propTypes = {
  editable: propTypes.bool,
};

export default File;