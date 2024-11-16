Feature: Crear administrador ghost

@user1 @web
Scenario: Sign Up
  Given I navigate to page "http://localhost:3002/ghost"
  And I wait for 2 seconds
  When I type title "title"
  And I type full name "name"
  And I type email address "alguien@hotmail.com"
  And I type password "123456#213asdf"
  And I click in create account
  And I wait for 2 seconds