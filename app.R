library(tibble)
library(lubridate)
library(shiny)
# library(fullcalendar)
library(htmlwidgets)
library(shinyalert)

# this will get read in
# should filter to current month (stays that overlap with current month)
stays <- tibble(
    title = "Andrew & Jenny",
    start = today(),
    end   = today() + days(3)
)

ui <- navbarPage(
    title = "Cabin Guestbook",

    tabPanel(
        title = "Calendar",
        # fullcalendarOutput("calendar", width = "60%", height = "50%"),

        h4("Plan new stay:"),
        dateInput("start", "Begin", value = today()),
        dateInput("end", "End", value = today() + days(1)),
        actionButton("save", "Save")
    ),

    tabPanel("Cabin Needs?"),
    tabPanel("Chores Checklist")
)

server <- function(input, output) {
    observeEvent(input$save, {
        proposed <- interval(input$start, input$end)
        existing <- map2(stays$start, stays$end, interval)
        overlaps <- any(map2_lgl(proposed, existing, int_overlaps))

        false_start <- input$start < today()

        # days must be in the future
        if (false_start) {
            message("invalid start time")
        }

        # trips shouldn't overlap?
        if (overlaps) {

        }

        # if all is okay, then add the proposed trip
        # needs to make stays reactive?
        if (!false_start & !overlaps) {
            stays <- bind_rows(stays, tibble(title = "hm", start = input$start, end = input$end))
        }
    })

    # output$calendar <- renderFullcalendar({
        # fullcalendar(stays)
    # })
}

# Run the application
shinyApp(ui = ui, server = server)
