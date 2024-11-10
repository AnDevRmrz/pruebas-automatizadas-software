Feature: Settings

@user1 @web
Scenario: 21 - Set site timezone
  Given I navigate to page "http://localhost:3002/ghost"
  And I wait for 1 seconds
  When I type email login "alguien@hotmail.com"  
  And I type password "123456#213asdf"
  And I click in sign in
  And I wait for 1 seconds
  And I click on the settings button
  And I wait for 1 seconds
  And I click on the edit button of site timezone
  And I wait for 1 seconds
  And I click on the timezone combobox
  And I select "Hawaii" timezone
  And I click on the save button of site timezone
  And I wait for 1 seconds
  Then I can see the new site timezone as "(GMT -10:00) Hawaii"
  And I wait for 1 seconds