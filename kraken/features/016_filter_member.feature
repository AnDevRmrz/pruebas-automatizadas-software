Feature: Members

@user1 @web
Scenario: Filter Member
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
  And I type in the member name field "Member_test_1"
  And I type in the email field "newmember@test.com"
  And I click in the save member button
  And I wait for 2 seconds
  And I click in members main option
  And I wait for 2 seconds
  And I click in new member button
  And I wait for 1 seconds
  And I type in the member name field "Member_test_2"
  And I type in the email field "newmember2@test.com"
  And I click in the save member button
  And I wait for 2 seconds
  And I click in members main option
  And I wait for 2 seconds
  And I click in filter members button
  And I type the name of the member I want to show as "Member_test_1"
  And I click apply changes filter members button
  Then I can see in the member row the member name "Member_test_1" and member email "newmember@test.com"
  And I cannot see in the member row the member name "MMember_test_2" and member email "newmember2@test.com"
  And I wait for 2 seconds

