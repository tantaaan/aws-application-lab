# Day2

## やったこと
- RDS作成（MySQL / db.t4g.micro）
- EC2からRDSに接続
- バックエンドをEC2にデプロイ
- EC2 + RDS構成でAPIの動作確認

## 構成
EC2(Node.js) → RDS(MySQL)
- EC2: i-0cbbe9fe1cfb989c8
- RDS: database-1.ctoig0cekj36.ap-northeast-1.rds.amazonaws.com

## 学んだこと
- RDSは最低2つのAZにサブネットが必要（Multi-AZ）
- セキュリティグループでEC2からRDSへのポート3306を許可
- EC2のセキュリティグループでポート3000を開放