Feature: Members

@user1 @web
Scenario: 13 - Delete Member
  Given I navigate to page "http://localhost:3002/ghost"
  And I wait for 1 seconds
  When I type email login "alguien@hotmail.com"  
  And I type password "123456#213asdf"
  And I click in sign in
  And I wait for 1 seconds
  And I click in members main option
  And I wait for 1 seconds
  And I click in the row with member name "Member New Name Test" and member email "membernewemail@test.com"
  And I wait for 1 seconds  
  And I click in the member gear button
  And I wait for 1 seconds
  And I click in the delete member button
  And I wait for 1 seconds
  And I click in the delete member confirmation button
  And I wait for 1 seconds
  Then I go to members
  And I wait for 2 seconds
  And I cannot see in the member row the member name "Member New Name Test" and member email "membernewemail@test.com"
  And I wait for 2 seconds