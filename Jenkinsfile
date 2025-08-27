@Library('Shared') _

pipeline {
    agent any

    parameters {
        string(name: 'DOCKER_TAG', defaultValue: '', description: 'Tag for Docker Images (e.g., v1, v2, latest)')
    }

    environment {
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

        stage('Workspace cleanup') {
            steps {
                cleanWs()
            }
        }

        stage('Git Clone') {
            steps {
                script {
                    code_checkout("https://github.com/rohitDev450/CodexHub-Mega-Project.git", "main")
                }
            }
        }

        stage('Trivy: Filesystem scan') {
            steps {
                script {
                    trivy_scan()
                }
            }
        }

        stage('OWASP: Dependency check') {
            steps {
                script {
                    owasp_dependency()
                }
            }
        }

        stage('SonarQube: Code Analysis') {
            steps {
                script {
                    sonarqube_analysis("sonar", "Codexhub", "Codexhub")
                }
            }
        }

        stage('SonarQube: Code Quality Gates') {
            steps {
                script {
                    sonarqube_code_quality()
                }
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    '''
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build -t rohitar/codexhub-frontend:${DOCKER_TAG} ./Frontend
                    docker build -t rohitar/codexhub-backend:${DOCKER_TAG} ./Backend
                '''
            }
        }

        stage('Docker Image Push') {
            steps {
                sh '''
                    docker push rohitar/codexhub-frontend:${DOCKER_TAG}
                    docker push rohitar/codexhub-backend:${DOCKER_TAG}
                '''
            }
        }
    }

    post {
        success {
            archiveArtifacts artifacts: '*.xml', followSymlinks: false
            build job: "Codexhub-CD", parameters: [
                string(name: 'DOCKER_TAG', value: "${params.DOCKER_TAG}")
            ]
        }
    }
}
