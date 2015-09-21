class Booking < ActiveRecord::Base
  before_create :add_uniq_id
  before_save :calculate_amount

  belongs_to :user
  belongs_to :event
  has_many :user_tickets
  accepts_nested_attributes_for :user_tickets
  enum payment_status: [
    :unpaid,
    :free,
    :paid
  ]
  #, allow_destroy: true, reject_if: :all_blank

  def paypal_url(return_path)
    values = {
        business: ENV['PAYPAL_BUSINESS'],
        cmd: "_xclick",
        return: "#{ENV['app_host']}#{return_path}",
        invoice: self.uniq_id,
        amount: self.amount,
        item_name: "Ticket for #{event.title}",
        item_number: id,
        quantity: self.user_tickets.size,
        notify_url: "#{ENV['paypal_notify_url']}/paypal_hook"
    }
    "#{ENV['paypal_host']}/cgi-bin/webscr?" + values.to_query
  end

  def self.validate_url
    "#{ENV['paypal_host']}/cgi-bin/webscr?cmd=_notify-validate"
  end

  private
    def calculate_amount
      cost = 0
      user_tickets.includes(:ticket_type).each{ |ticket|
        cost += ticket.ticket_type.price.to_f
      }
      self.amount = cost
      # user_tickets
      # require 'pry' ; binding.pry
    end

    def add_uniq_id
      self.uniq_id = SecureRandom.hex
    end

end
