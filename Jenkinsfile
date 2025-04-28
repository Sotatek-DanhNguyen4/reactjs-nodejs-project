pipeline {
    agent any
    
    stages {
        stage('Fetch Code') {
            steps {
                git branch: 'master', url: 'git@github.com:Sotatek-HuyNguyen17/reactjs-nodejs-project.git'
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
                    sh 'docker-compose build -t reactjs-nodejs-project:latest .'
                }
            }
            
        }
    }
}
