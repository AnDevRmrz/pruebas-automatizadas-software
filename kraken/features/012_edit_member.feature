Feature: Members

@user1 @web
Scenario: 12 - Edit Member
  Given I navigate to page "http://localhost:3002/ghost"
  And I wait for 1 seconds
  When I type email login "alguien@hotmail.com"  
  And I type password "123456#213asdf"
  And I click in sign in
  And I wait for 1 seconds
  And I click in members main option
  And I wait for 1 seconds
  And I click in the row with member name "Member Name Test" and member email "newmember@test.com"
  And I wait for 1 seconds
  And I type in the member name field "Member New Name Test"
  And I type in the email field "membernewemail@test.com"
  And I click in the save member button
  And I wait for 2 seconds
  Then I go to members
  And I wait for 2 seconds
  And I can see in the member row the member name "Member New Name Test" and member email "membernewemail@test.com"
  And I wait for 2 seconds