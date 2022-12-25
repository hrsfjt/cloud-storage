import React, { createRef } from 'react';
import Style from './Uploader.module.css';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

// https://docs.aws.amazon.com/ja_jp/sdk-for-javascript/v3/developer-guide/loading-browser-credentials-cognito.html
const s3Client = new S3Client({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: fromCognitoIdentityPool({
    clientConfig: {
      region: process.env.REACT_APP_AWS_REGION,
    },
    identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID,
  }),
});

class Uploader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: {},
    };

    this.fileRef = createRef();

    this.change = this.change.bind(this);
    this.upload = this.upload.bind(this);
    this.reset = this.reset.bind(this);
  }

  change(event) {
    this.setState({ files: event.target.files });
  }

  reset() {
    this.setState({ files: {} });
    this.fileRef.current.value = null;
  }

  async upload() {
    if (!this.state.files.length) {
      return window.alert('no file specified');
    }

    const confirmed = window.confirm('Upload specified file to S3?');
    if (!confirmed) {
      return;
    }

    try {
      // TODO: multiple upload
      const file = this.state.files[0];
      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
          Body: file,
          Key: file.name,
        })
      );
    } catch (ex) {
      console.error(ex);
    } finally {
      this.reset();
    }
  }

  render() {
    return (
      <div>
        <input className={Style.inputFile} type="file" name="file" onChange={this.change} ref={this.fileRef}></input>
        <button className={Style.button} onClick={this.upload}>
          Upload
        </button>
        <button className={Style.button} onClick={this.reset}>
          Reset
        </button>
      </div>
    );
  }
}

export default Uploader;
