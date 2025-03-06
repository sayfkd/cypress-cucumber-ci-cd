pipeline {
    agent {
        docker {
            image "cypress/browsers"
            args '--entrypoint=""'
        }
    }

    parameters {
        // choice(name: 'TAG', choices: ['smoke', 'e2e', 'sanity', 'regression', 'login'], description: 'TAG des tests Cypress')
        string(name: 'TAG', defaultValue: '@', description: 'TAG du test')
    }

    stages {
        stage('Vérifier la version de npm') {
            steps {
                sh "npm -v"
                sh "npm ci"
            }
        }

        stage('Test Cypress') {
            // steps {
            //     script {
            //         def testCommand = "npx cypress run --reporter junit"

            //         if (params.NAME?.trim()) {
            //             testCommand += " --env grep='${params.NAME}'"
            //         } else {
            //             testCommand += " --env grepTags='@${params.TAG}'"
            //         }

            //         sh testCommand
            //     }
            // }
             steps {
                def testCommand = "npx cypress run"
                if (params.NAME?.trim()) {
                        testCommand += " --env TAGS='${params.TAG}'"
                    }
                sh testCommand
            }
        }
    }

    // post {
    //     always {
    //         junit 'results/**/*.xml'
    //     }
    // }
}
