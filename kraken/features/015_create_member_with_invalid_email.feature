Feature: Members

@user1 @web
Scenario: Create Member with Invalid Email
  Given I navigate to page "http://localhost:3002/ghost"
  And I wait for 1 seconds
  When I type email login "alguien@hotmail.com"  
  And I type password "123456#213asdf"
  And I click in sign in
  And I wait for 1 seconds
  And I click in members main option
  And I wait for 1 seconds
  And I click in new member button
  And I wait for 1 seconds
  And I type in the member name field "Invalid Member"
  And I type in the email field "invalidemail@test-com"
  And I click in the save member button
  And I wait for 2 seconds
  Then I go to members
  And I wait for 1 seconds
  And I confirm I want to leave member creation page
  And I wait for 2 seconds
  And I cannot see in the member row the member name "MInvalid Member" and member email "nvalidemail@test-com"
  And I wait for 2 seconds