library(shiny)

source("utils.R")

ui <- navbarPage(
  "Guestbook",

  tabPanel(
    title = "Calendar",
    fluidRow(
      column(
        width = 3,
        selectInput("cal_yr", label = "Year", choices = 2022:2032)
      ),
      column(
        width = 3,
        selectInput("cal_mon", label = "Month", choices = month.name[4:8])
      )
    ),
    plotOutput("cal")
  ),

  tabPanel(
    title = "Reserve",
    dataTableOutput("tab"),
    dataTableOutput("proposed"),
    fluidRow(
      column(
        width = 3,
        selectInput("res_who", "Who", choices = sort(c("Amanda", "Andrew", "Bennet", "Dan", "Dorothy", "Emily", "Jeff", "Josh", "Larry", "Mike", "Tyler")))
      ),
      column(
        width = 3,
        dateInput("res_start", "Start", value = today())
      ),
      column(
        width = 3,
        dateInput("res_end", "End", value = today() + 1)
      ),
      column(
        width = 3,
        actionButton("book", "Go")
      )
    ),
  ),

  navbarMenu(
    "More",
    tabPanel("Sub-Component A"),
    tabPanel("Sub-Component B")
  )
)

server <- function(input, output) {
  trip <- eventReactive(input$go, {
    tibble(who = input$res_who, start = input$res_start, end = input$res_end)
  })

  output$proposed <- renderDataTable(trip())

  output$cal <- renderPlot({
    m <- switch(
      input$cal_mon,
      "April"  = 4,
      "May"    = 5,
      "June"   = 6,
      "July"   = 7,
      "August" = 8
    )

    s <- stays %>%
      unnest_stays() %>%
      filter(month(dt) == m)

    if (nrow(s) > 0) {
      my_calndr(input$cal_yr, m, text = s$who, text.pos = day(s$dt))
    } else {
      my_calndr(input$cal_yr, m)
    }
  })

  output$tab <- renderDataTable(stays)
}

shinyApp(ui, server, onStart = function() {
  cat("Starting up...\n")

  onStop(function() {
    cat("Shutting down...\n")
  })
})
