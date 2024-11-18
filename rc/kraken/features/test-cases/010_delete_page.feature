Feature: Page

@user3 @web
Scenario: 10 - Delete Page
    Given I navigate to page "http://localhost:3002/ghost"
    And I wait for 2 seconds
    When I type email login "alguien@hotmail.com"  
    And I type password "123456#213asdf"
    And I click in sign in
    And I wait for 1 seconds
    And I click on Pages
    And I wait for 1 seconds
    And I click on New page
    And I wait for 1 seconds
    And I type page title "Title Changed"
    And I wait for 1 seconds
    And I type page description "Description"  
    And I wait for 1 seconds
    And I click on Publish Page
    And I wait for 1 seconds
    And I click on Final Review
    And I wait for 1 seconds
    And I click on Publish Page right now
    And I click in close page popup
    And I wait for 1 seconds
    And I do right click over the Title Changed
    And I wait for 1 seconds
    And I click on delete
    And I wait for 1 seconds
    And I click on big delete once again
    And I wait for 1 seconds
    Then I check that the deleted page with title "Title Changed" is no longer existent
    And I wait for 1 seconds
