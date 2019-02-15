FROM ruby:2.5

WORKDIR /application

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt install -y nodejs

ENV RAILS_ENV=production

RUN bundle install

COPY package.json ./
RUN npm install

COPY ./ ./

RUN ./node_modules/.bin/gulp
RUN ./node_modules/.bin/webpack -p

RUN bundle exec rails assets:precompile

CMD ["bundle", "exec", "rails", "server"]
