# CodexHub-Mega-Project
A cloud-native 3-tier application (React, Node.js, MongoDB) showcasing end-to-end DevOps practices with Docker, Jenkins CI/CD, and Kubernetes for scalable deployment.

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

📷 Image: ArgoCD Service Exposed

Get Initial Password
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo

------------------------------------------------------------------

Username: admin

Reset password after login

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

------------------------------------------------------------------


🔗 Jenkins Plugins Required

OWASP Dependency Check

SonarQube Scanner

Docker Pipeline

Stage View

------------------------------------------------------------------

📷 Image: Jenkins Plugins Installation

------------------------------------------------------------------

🔒 SonarQube Integration

Create Token → Administration → Security → Users → Token.

Add credentials in Jenkins.

Configure SonarQube Scanner in Jenkins Tools.

Set Webhook in SonarQube for Jenkins.

📷 Image: SonarQube Webhook Setup

📝 Steps to Implement the Project

Install all required tools on Jenkins Master/Worker.

Configure credentials for GitHub, DockerHub, SonarQube, and Gmail.

Setup Jenkins pipeline stages:

Checkout → Build → Quality → Security → Docker → GitOps → Deploy.

Verify deployment on Kubernetes cluster.

📷 Image: Final Application Running

------------------------------------------------------------------

🎯 Outcome

Fully automated CI/CD pipeline

Code → Build → Test → Secure → Deploy → Monitor

GitOps-driven deployment using ArgoCD

Scalable, zero-downtime app with Kubernetes
