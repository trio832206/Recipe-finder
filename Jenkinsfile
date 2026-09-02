pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Start React Server') {
            steps {
                bat '''
                    start "React Server" /B cmd /c "npm run preview -- --host 0.0.0.0 --port 4173 > react-server.log 2>&1"
                '''
            }
        }
    }

    post {
        success {
            echo 'React application build successful!'
            echo 'Open http://localhost:4173 in your browser.'
        }

        failure {
            echo 'React application build failed!'
        }
    }
}