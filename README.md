# ParkingMoney

A auto parking time counting and payment manage system, aimed at parking lot.

终端应用使用树莓派，pi文件夹中是树莓派的代码

Related paper is [here](https://github.com/yindaheng98/My-docs/blob/master/%E4%BD%9C%E4%B8%9A%E5%92%8C%E5%AE%9E%E9%AA%8C/%E7%89%A9%E8%81%94%E7%BD%91%E7%BB%BC%E5%90%88%E8%AF%BE%E7%A8%8B%E8%AE%BE%E8%AE%A1%E6%8A%A5%E5%91%8A/LabReport.pdf)

## 用doaker-compose部署

```shell
docker-compose up
```

## 用K8S部署

### 下载到本地部署

```shell
kubectl apply -f ./configmap-alipay.yaml
kubectl apply -f ./configmap-app.yaml
kubectl apply -f ./pv-pic-ssd.yaml
kubectl apply -f ./parking-money.yaml
kubectl apply -f ./service-parking-money.yaml
URL=https://raw.githubusercontent.com/yindaheng98/ParkingMoney/master
```

### 联网部署

```shell
URL=https://raw.githubusercontent.com/yindaheng98/ParkingMoney/master
kubectl apply -f $URL/configmap-alipay.yaml
kubectl apply -f $URL/configmap-app.yaml
kubectl apply -f $URL/pv-pic-ssd.yaml
kubectl apply -f $URL/parking-money.yaml
kubectl apply -f $URL/service-parking-money.yaml
```

### 删除部署

```shell
kubectl delete svc parking-money
kubectl delete statefulset parking-money-deploy
kubectl delete pvc pictures-parking-money-deploy-0
kubectl delete pv pv-parking-money-pic
kubectl delete cm parking-money-configmap-app
kubectl delete cm parking-money-configmap-alipay
```