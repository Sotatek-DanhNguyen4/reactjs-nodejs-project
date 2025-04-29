pipeline {
    agent any
    
    stages {
        stage('Fetch Code') {
            steps {
                git branch: 'develop', url: 'git@github.com:Sotatek-HuyNguyen17/reactjs-nodejs-project.git'
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
        stage('Build image from dockercompose') {
            steps {
                script {
                    sh 'docker build -t react-nodejs-frontend:latest -f frontend/Dockerfile'
                    sh 'docker build -t react-nodejs-backend:latest -f backend/Dockerfile'
                    sh 'docker tag react-nodejs-frontend:latest react-nodejs-frontend:commit'
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
        
    }
}

