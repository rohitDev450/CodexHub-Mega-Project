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

Install docker (Jenkins Worker)
sudo apt install docker.io -y
sudo usermod -aG docker ubuntu && newgrp docker
Install and configure SonarQube (Master machine)
docker run -itd --name SonarQube-Server -p 9000:9000 sonarqube:lts-community
Install Trivy (Jenkins Worker)
sudo apt-get install wget apt-transport-https gnupg lsb-release -y
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt-get update -y
sudo apt-get install trivy -y
Install and Configure ArgoCD (Master Machine)
Create argocd namespace
kubectl create namespace argocd
Apply argocd manifest
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
Make sure all pods are running in argocd namespace
watch kubectl get pods -n argocd
Install argocd CLI
sudo curl --silent --location -o /usr/local/bin/argocd https://github.com/argoproj/argo-cd/releases/download/v2.4.7/argocd-linux-amd64
Provide executable permission
sudo chmod +x /usr/local/bin/argocd
Check argocd services
kubectl get svc -n argocd
Change argocd server's service from ClusterIP to NodePort
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "NodePort"}}'
Confirm service is patched or not
kubectl get svc -n argocd
Check the port where ArgoCD server is running and expose it on security groups of a worker node image
Access it on browser, click on advance and proceed with
<public-ip-worker>:<port>
image image image
Fetch the initial password of argocd server
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo
Username: admin
Now, go to User Info and update your argocd password
Steps to add email notification
Go to your Jenkins Master EC2 instance and allow 465 port number for SMTPS
Now, we need to generate an application password from our gmail account to authenticate with jenkins
Open gmail and go to Manage your Google Account --> Security
Important

Make sure 2 step verification must be on

image

Search for App password and create a app password for jenkins image image
Once, app password is create and go back to jenkins Manage Jenkins --> Credentials to add username and password for email notification image
Go back to Manage Jenkins --> System and search for Extended E-mail Notification image
Scroll down and search for E-mail Notification and setup email notification
Important

Enter your gmail password which we copied recently in password field E-mail Notification --> Advance

image image image

Steps to implement the project:
Go to Jenkins Master and click on Manage Jenkins --> Plugins --> Available plugins install the below plugins:
OWASP
SonarQube Scanner
Docker
Pipeline: Stage View
Configure OWASP, move to Manage Jenkins --> Plugins --> Available plugins (Jenkins Worker) image

After OWASP plugin is installed, Now move to Manage jenkins --> Tools (Jenkins Worker) image

Login to SonarQube server and create the credentials for jenkins to integrate with SonarQube
Navigate to Administration --> Security --> Users --> Token image image image
Now, go to Manage Jenkins --> credentials and add Sonarqube credentials: image
Go to Manage Jenkins --> Tools and search for SonarQube Scanner installations: image
Go to Manage Jenkins --> credentials and add Github credentials to push updated code from the pipeline: image
Note

While adding github credentials add Personal Access Token in the password field.

Go to Manage Jenkins --> System and search for SonarQube installations: image
Now again, Go to Manage Jenkins --> System and search for Global Trusted Pipeline Libraries:</b image image
Login to SonarQube server, go to Administration --> Webhook and click on create image image


