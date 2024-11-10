Feature: Page

@user3 @web
Scenario: Create Page
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
    And I type page title "Title"
    And I wait for 1 seconds
    And I type page description "Description"  
    And I wait for 1 seconds
    And I click on Publish Page
    And I wait for 1 seconds
    And I click on Final Review
    And I wait for 1 seconds
    And I click on Publish Page right now
    And I wait for 1 seconds
    Then the page title is visible 
    And I wait for 1 seconds
    And the page description is visible 
    And I wait for 1 seconds
    And I click on close
    And I wait for 1 seconds
    And I check the title page is visible in list
    And I wait for 1 seconds