# cloud-storage

S3上にファイルを保存する用のクライアント

## Environment

| Name    | Version |
| ------- | ------- |
| Node    | 18.12.1 |
| AWS SDK | v3.x    |

## Preparation

- Create `Cognito ID Pool`
  - Edit `IAM Role` for Cognito_xxxUnauth_Role
- Create `S3 Bucket`
  - Edit `Cross-Origin Resource Sharing (CORS)`
