# CodexHub-Mega-Project
A cloud-native 3-tier application (React, Node.js, MongoDB) showcasing end-to-end DevOps practices with Docker, Jenkins CI/CD, and Kubernetes for scalable deployment.

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/a70f9670-7c4e-47e9-bc9d-0f5e2d148064" />


Tech stack used in this project:
--------------------------------------------------------------------------
GitHub (Code)
Docker (Containerization)
Jenkins (CI)
OWASP (Dependency check)
SonarQube (Quality)
Trivy (Filesystem Scan)
ArgoCD (CD)

------------------------------------------------------------------
How pipeline will look after deployment:
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/91d93f70-4773-4067-a02e-fdf5012a4d24" />

----------------------------------------------------------------
CD pipeline to update application version 
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/c85f65ad-4222-4949-a05f-32c23e580b85" />

------------------------------------------------------------------

🔧 Installation & Setup
1️⃣ Install Docker (Jenkins Worker)
sudo apt install docker.io -y
sudo usermod -aG docker ubuntu && newgrp docker

------------------------------------------------------------------

2️⃣ Install & Configure SonarQube (Master Machine)
docker run -itd --name SonarQube-Server -p 9000:9000 sonarqube:lts-community

------------------------------------------------------------------

3️⃣ Install Trivy (Jenkins Worker)
sudo apt-get install wget apt-transport-https gnupg lsb-release -y
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt-get update -y
sudo apt-get install trivy -y

------------------------------------------------------------------

4️⃣ Install & Configure ArgoCD (Master Machine)
# Create namespace
kubectl create namespace argocd  

------------------------------------------------------------------

# Apply ArgoCD manifest
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml  

------------------------------------------------------------------

# Check pods
watch kubectl get pods -n argocd

------------------------------------------------------------------

Install CLI
sudo curl --silent --location -o /usr/local/bin/argocd https://github.com/argoproj/argo-cd/releases/download/v2.4.7/argocd-linux-amd64
sudo chmod +x /usr/local/bin/argocd

------------------------------------------------------------------

Change ArgoCD Service Type
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "NodePort"}}'
kubectl get svc -n argocd

------------------------------------------------------------------

<img width="1327" height="624" alt="image" src="https://github.com/user-attachments/assets/402bfdea-9997-4640-8374-99e4057bcce1" />


📷 Image: ArgoCD Service Exposed

Get Initial Password
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo

<img width="1320" height="641" alt="image" src="https://github.com/user-attachments/assets/729c9784-52d6-46de-9f74-69cc2f48e7d4" />

------------------------------------------------------------------

Username: admin

Reset password after login

<img width="1326" height="669" alt="image" src="https://github.com/user-attachments/assets/640c9195-a64a-4147-aa34-5a8dae0000ca" />


📷 Image: ArgoCD Login Screen

------------------------------------------------------------------

📧 Email Notifications (Jenkins)

Allow port 465 (SMTPS) on Jenkins Master EC2.

Enable 2-Step Verification in Gmail.

Generate an App Password for Jenkins.

------------------------------------------------------------------

📷 Image: Gmail App Password Setup

Add credentials in Jenkins → Manage Jenkins → Credentials.

Configure under:

Extended E-mail Notification

E-mail Notification (Advanced settings)
------------------------------------------------------------------


📷 Image: Jenkins Email Setup
<img width="1336" height="631" alt="image" src="https://github.com/user-attachments/assets/e0e13ea2-34d0-48a2-b881-428d5b4af5cd" />


------------------------------------------------------------------


🔗 Jenkins Plugins Required

OWASP Dependency Check

SonarQube Scanner

Docker Pipeline

Stage View

------------------------------------------------------------------

📷 Image: Jenkins Plugins Installation
<img width="1339" height="634" alt="image" src="https://github.com/user-attachments/assets/4a074372-bc79-4dce-af44-98e0852041d0" />

------------------------------------------------------------------

🔒 SonarQube Integration

Create Token → Administration → Security → Users → Token.

Add credentials in Jenkins.
<img width="1314" height="670" alt="image" src="https://github.com/user-attachments/assets/ad006086-1491-4e0e-af4d-bd1db2fddd1e" />

<img width="1332" height="557" alt="image" src="https://github.com/user-attachments/assets/8985aa92-5503-441f-92c8-160b528f86a9" />


Configure SonarQube Scanner in Jenkins Tools.

Set Webhook in SonarQube for Jenkins.

<img width="1297" height="378" alt="image" src="https://github.com/user-attachments/assets/3e3321f3-1092-4273-a56c-fefefb19f639" />

------------------------------------------------------------------

🎯 Outcome

Fully automated CI/CD pipeline

Code → Build → Test → Secure → Deploy → Monitor

GitOps-driven deployment using ArgoCD

Scalable, zero-downtime app with Kubernetes
