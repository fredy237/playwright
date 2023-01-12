pipeline {
    agent any
    stages {
        stage('install playwright') {
        steps {
            bat '''
            npm i
            npx playwright install
            '''
        }
        }
        stage('test') {
          steps {
              bat '''
              npx cucumber-js --config cucumber.mjs --tags @login
              '''
          }
          post {
            success {
              script{
                if (fileExists("results-cucumber")) {
                  archiveArtifacts(artifacts: 'results-cucumber/**', followSymlinks: true)
                } else {
                  bat 'echo "No test Artifacts."'
                }
              }
            }
          }
        }
    }
    post {
        always {
            allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'reports/allure-results']]
            ])
        }
    }
}