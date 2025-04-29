pipeline {
    agent any
    
    stages {

        stage('Fetch Code') {
            steps {
                git branch: 'develop', url: 'git@github.com:Sotatek-HuyNguyen17/reactjs-nodejs-project.git'
            }
        }

        stage('Create environment variables') {
            steps{
                script {
                    def scmVars =checkout([$class: 'GitSCM', branches: [[name: 'develop']], userRemoteConfigs: [[url: 'git@github.com:Sotatek-HuyNguyen17/reactjs-nodejs-project.git']]])
                    env.GIT_COMMIT = scmVars.GIT_COMMIT
                    env.GIT_COMMIT_SHORT = scmVars.GIT_COMMIT.take(7) // Get the short SHA
                }
            }
        }

        stage('Code Analysis') {
            environment {
                scannerHome = tool 'SonarQube'
            }
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {
                        sh "${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=react-nodejs-project \
                            -Dsonar.projectName=react-nodejs-project \
                            -Dsonar.projectVersion=v1.0.0"
                    }
                }
                echo 'Code analysis completed.'
            }
        } 
        stage('Build images') {
            steps {
                script {
                     // Build and tag images with both 'latest' and the short Git commit hash
                    sh 'docker build -t ${REPOSITORY_URI}/react-nodejs-frontend:latest -t ${REPOSITORY_URI}/react-nodejs-frontend:${GIT_COMMIT_SHORT} -f ./frontend'
                    sh 'docker build -t ${REPOSITORY_URI}/react-nodejs-backend:latest -t ${REPOSITORY_URI}/react-nodejs-backend:${GIT_COMMIT_SHORT} -f ./backend'
                }
            }
            
        }
        stage('Scan Frontend Image') {
            steps {
                script {
                    sh 'trivy image --exit-code 0 --format json -o $(date +%H:%M:%S)_frontend_report.json --severity HIGH,CRITICAL react-nodejs-frontend:latest'
                    sh 'pwd'
                }
                echo 'Frontend image security scan completed.'
            }
        }
        stage('Scan Backend Image') {
            steps {
                script {
                    sh 'trivy image  --exit-code 0 --format json -o $(date +%H:%M:%S)_backend_report.json --severity HIGH,CRITICAL react-nodejs-backend:latest'
                }
                echo 'Backend image security scan completed.'
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub
                    sh 'echo ${DOCKER_PASSWORD} | docker login ${REPOSITORY_URI} -u ${DOCKER_USERNAME} --password-stdin'
                    
                    // Push images with both 'latest' and the short Git commit hash tags
                    sh 'docker push ${REPOSITORY_URI}/react-nodejs-frontend:latest'
                    sh 'docker push ${REPOSITORY_URI}/react-nodejs-frontend:${GIT_COMMIT_SHORT}'
                    sh 'docker push ${REPOSITORY_URI}/react-nodejs-backend:latest'
                    sh 'docker push ${REPOSITORY_URI}/react-nodejs-backend:${GIT_COMMIT_SHORT}'
                }
            }
        }
        
    }
}
