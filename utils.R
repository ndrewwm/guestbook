library(tidyverse)
library(lubridate)
library(calendR)

stays <- read_csv("data/stays.csv", col_types = "cDD")

unnest_stays <- function(stays) {
  out <- tibble()
  for (i in 1:nrow(stays)) {
    j <- tibble(who = stays$who[i], dt = as.Date(stays$start[i]:stays$end[i], origin = "1970-1-1"))
    out <- bind_rows(out, j)
  }
  out
}

my_calndr <- function(yr, mo, ...) {
  calendR(
    year = yr,
    month = mo,
    start = "M",
    title = "",
    weeknames = c("Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"),
    text.size = 8,
    ...
  )
}
