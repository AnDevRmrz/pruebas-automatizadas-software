Feature: Iniciar sesion

@user2 @web
Scenario: Sign In
  Given I navigate to page "http://localhost:3002/ghost"
  And I wait for 2 seconds
  When I type email login "alguien@hotmail.com"  
  And I type password "123456#213asdf"
  And I click in sign in
  And I wait for 2 seconds
  Then The title is visible
  And I wait for 2 seconds