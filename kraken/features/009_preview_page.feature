Feature: Page

@user3 @web
Scenario: Preview Page
    Given I navigate to page "http://localhost:3002/ghost"
    And I wait for 2 seconds
    When I type email login "alguien@hotmail.com"  
    And I type password "123456#213asdf"
    And I click in sign in
    And I wait for 1 seconds
    And I click on Pages
    And I wait for 1 seconds
    And I click on Go to Editor
    And I wait for 1 seconds
    And I click on Page settings
    And I wait for 2 seconds
    And I click on view Page
    And I wait for 2 seconds
    Then I check the title on view page
    And I wait for 2 seconds
    And I check the description on view page
    And I wait for 2 seconds