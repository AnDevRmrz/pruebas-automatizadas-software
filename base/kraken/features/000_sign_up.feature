Feature: Crear administrador ghost

@user1 @web
Scenario: Sign Up
  Given I navigate to page "http://localhost:3002/ghost"
  And I wait for 1 seconds
  When I click on create account button
  And I wait for 1 seconds
  And I type title "title"
  And I type full name "name"
  And I type email address "alguien@hotmail.com"
  And I type password "123456#213asdf"
  And I click on last step button
  And I wait for 1 seconds
  And I click on take me to the site
  And I wait for 1 seconds