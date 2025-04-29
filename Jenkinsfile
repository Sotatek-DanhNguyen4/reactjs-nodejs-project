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
                    sh 'docker-compose -f docker-compose.yml build'
                }
            }
            
        }
        stage('Scan Frontend Image') {
            steps {
                script {
                    sh 'trivy image --exit-code 0 --severity HIGH,CRITICAL react-nodejs-frontend:latest'
                }
                echo 'Frontend image security scan completed.'
            }
        }
        stage('Scan Backend Image') {
            steps {
                script {
                    sh 'trivy image --exit-code 0 --severity HIGH,CRITICAL react-nodejs-backend:latest'
                }
                echo 'Backend image security scan completed.'
            }
        }
    }
}
