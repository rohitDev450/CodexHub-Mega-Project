@Library('Shared') _
pipeline {
    agent any
    parameters {
        string(name: 'DOCKER_TAG', defaultValue: '', description: 'Tag for Docker Images (e.g., v1, v2, latest)')
       
    }
    environment {
        DOCKER_CREDS = credentials('docker')
        KUBECONFIG = 'kubeconfig'
        SONAR_HOME = tool "sonar"
    }

    stages {
        stage('Validate Parameters') {
            steps {
                script {
                    if (!params.DOCKER_TAG?.trim()) {
                        error '❌ DOCKER_TAG parameter is required! Please provide a tag value (e.g., v1, v2).'
                    } else {
                        echo "✅ DOCKER_TAG is set to: ${params.DOCKER_TAG}"
                    }
                }
            }
        }
         stage("Workspace cleanup"){
            steps{
                script{
                    cleanWs()
                }
            }
        }
        stage('Git Clone') {
            steps {
                script{
                    code_checkout("https://github.com/rohitDev450/CodexHub-Mega-Project.git","main")
                }
            }
        }
        stage("Trivy: Filesystem scan"){
            steps{
                script{
                    trivy_scan()
                }
            }
        }

        stage("OWASP: Dependency check"){
            steps{
                script{
                    owasp_dependency()
                }
            }
        }
        
        stage("SonarQube: Code Analysis"){
            steps{
                script{
                    sonarqube_analysis("sonar","Codexhub","Codexhub")
                }
            }
        }
        
        stage("SonarQube: Code Quality Gates"){
            steps{
                script{
                    sonarqube_code_quality()
                }
            }
        }
        stage('Docker Login') {
            steps {
                sh "echo $DOCKER_CREDS_PSW | docker login -u $DOCKER_CREDS_USR --password-stdin"
            }
        }
        stage('Docker Build') {
            steps {
                sh "docker build -t rohitar/codexhub-frontend:${params.DOCKER_TAG} ./Frontend"
                sh "docker build -t rohitar/codexhub-backend:${params.DOCKER_TAG} ./Backend"
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

                  # Deploy PV and PVC for MongoDB
                  kubectl apply -f ${WORKSPACE}/k8s/mongodb-pv.yml
                  kubectl apply -f ${WORKSPACE}/k8s/mongodb-pvc.yml -n codexhub

                  kubectl apply -f ${WORKSPACE}/k8s/mongodb-deployment.yml -n codexhub
                  kubectl apply -f ${WORKSPACE}/k8s/mongodb-service.yml -n codexhub

                  kubectl apply -f ${WORKSPACE}/k8s/backend-deployment.yml -n codexhub
                  kubectl apply -f ${WORKSPACE}/k8s/backend-service.yml -n codexhub

                  kubectl apply -f ${WORKSPACE}/k8s/frontend-deployment.yml -n codexhub
                  kubectl apply -f ${WORKSPACE}/k8s/frontend-service.yml -n codexhub

                """
            }
        }
    }
    post {
        success {
            archiveArtifacts artifacts: '*.xml', followSymlinks: false
        }
    }
}
