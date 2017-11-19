class Post
  include Mongoid::Document
  field :title, type: String
  field :body, type: String
  field :author, type: String
  field :created, :type => DateTime, default: ->{Date.today}
end
