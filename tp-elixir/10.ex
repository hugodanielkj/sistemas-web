defmodule BirdCount do
  def today([]), do: nil
  def today([hoje | _]), do: hoje

  def increment_day_count([]), do: [1]
  def increment_day_count([hoje | resto]), do: [hoje + 1 | resto]

  def has_day_without_birds?([]), do: false
  def has_day_without_birds?([0 | _]), do: true
  def has_day_without_birds?([_ | resto]), do: has_day_without_birds?(resto)

  def total([]), do: 0
  def total([dia | resto]), do: dia + total(resto)

  def busy_days([]), do: 0
  def busy_days([dia | resto]) when dia >= 5, do: 1 + busy_days(resto)
  def busy_days([_ | resto]), do: busy_days(resto)
end
