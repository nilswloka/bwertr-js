Feature: Rate a presentation

  As a user
  I want to rate a presentation
  So that I can help the speaker improve

  Scenario: Rate with poor
    When I visit the application
    And I rate with "Poor"
    Then I can see that I have rated with "Poor"

  Scenario: Rate with average
    When I visit the application
    And I rate with "Average"
    Then I can see that I have rated with "Average"

  Scenario: Rate with excellent
    When I visit the application
    And I rate with "Excellent"
    Then I can see that I have rated with "Excellent"