Feature: Settings

@user1 @web
Scenario: 20 - Set site timezone
  Given I navigate to page "http://localhost:3003/ghost"
  And I wait for 1 seconds
  When I type email login "alguien@hotmail.com"  
  And I type password login "123456#213asdf"
  And I click in sign in
  And I wait for 1 seconds
  And I click on the settings button
  And I wait for 1 seconds
  And I click on the general settings option button
  And I wait for 1 seconds
  And I click on the expand button of set timezone
  And I wait for 1 seconds    
  And I select the second option of the timezone that is Hawaii
  And I click on the save settings button
  And I wait for 1 seconds
  Then I can see the new site timezone as Hawaii
  And I wait for 1 seconds