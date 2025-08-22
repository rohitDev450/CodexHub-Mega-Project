pipeline {
    agent any
      parameters {
        string(name: 'DOCKER_TAG', defaultValue: '', description: 'Tag for Docker Images (e.g., v1, v2, latest)')
    }
    environment{
        DOCKER_CREDS = credentials('Docker_user') 
        KUBECONFIG = '/var/lib/jenkins/.kube/config'
    }

    stages {
        stage('Validate Parameters') {
            steps {
                script {
                    if (!params.DOCKER_TAG?.trim()) {
                        error "❌ DOCKER_TAG parameter is required! Please provide a tag value (e.g., v1, v2)."
                    } else {
                        echo "✅ DOCKER_TAG is set to: ${params.DOCKER_TAG}"
                    }
                }
            }
        }
        stage('Git Clone') {
            steps {
               git url: 'https://github.com/rohitDev450/CodexHub-Mega-Project.git', branch: 'main', changelog: false, poll: false
            }
       }
       stage('Docker Login') {
            steps {
                sh "echo $DOCKER_CREDS_PSW | docker login -u $DOCKER_CREDS_USR --password-stdin"
            }
        }
       stage('Debug Workspace') {
           steps {
             sh 'pwd'
             sh 'ls -R'
            }
        }
        stage('Docker Build') {
            steps {
                sh "docker build -t rohitar/codexhub-frontend:${params.DOCKER_TAG} ./Frontend"
                sh "docker build -t rohitar/codexhub-backend:${params.DOCKER_TAG} ./Backend"
            }
        }
         stage('Test Code') {
            steps {
                   echo "Code is testing by devloper"
            }
        }
        stage('Docker Image Push') {
            steps {
                sh "docker push rohitar/codexhub-frontend:${params.DOCKER_TAG}"
                sh "docker push rohitar/codexhub-backend:${params.DOCKER_TAG}"
            }
        }
        stage('Code Deploy') {
            steps {
                 sh """
                  kubectl apply -f ${WORKSPACE}/k8s/namespace.yml

                  kubectl apply -f ${WORKSPACE}/k8s/frontend-deployment.yml
                  kubectl apply -f ${WORKSPACE}/k8s/frontend-service.yml

                  kubectl apply -f ${WORKSPACE}/k8s/backend-deployment.yml
                  kubectl apply -f ${WORKSPACE}/k8s/backend-service.yml

                  kubectl apply -f ${WORKSPACE}/k8s/mongodb-deployment.yml
                  kubectl apply -f ${WORKSPACE}/k8s/mongodb-service.yml
                """
            }
        }
   }
   post {
     success {
         archiveArtifacts artifacts: '*.yml', followSymlinks: false
        }
    }
}