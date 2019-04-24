var app = angular.module('TransactEmail.Services', []);

app.factory('ServiceList', function() {

  var services = [
    {
      name: 'Mandrill',
      url: 'http://mandrill.com/pricing/new/',
      image: 'mandrill.png',
      notes: 'All plans need a MailChimp account.',
      emails_per_block: 25000,
      prices: [
        { price_per_block: 20, emails_a_month: 500000 },
        { price_per_block: 18, emails_a_month: 1000000 },
      ]
    },

    {
      name: 'Sendgrid',
      url: 'https://sendgrid.com/transactional-email/pricing',
      image: 'sendgrid.png',
      notes: '400/day on the free plan',
      free: 12000,
      prices: [
        { price_per_month: 9.95, emails_a_month: 40000 },
        { price_per_month: 79.95, emails_a_month: 100000 },
        { price_per_month: 199.95, emails_a_month: 300000 },
        { price_per_month: 399.95, emails_a_month: 700000 }
      ]
    },

    {
      name: 'Amazon SES',
      url: 'http://aws.amazon.com/ses/pricing/',
      image: 'amazon-ses.png',
      notes: '62,000 messages per month are free for EC2 users',
      prices: [
        { price_per_email: 0.0001, emails_a_month: Number.MAX_VALUE }
      ]
    },

    {
      name: 'Mailgun',
      url: 'http://www.mailgun.com/pricing',
      image: 'mailgun.png',
      notes: 'By Rackspace',
      free: 10000,
      prices: [
        { price_per_email: 0.0005, emails_a_month: 500000 },
        { price_per_email: 0.00035, emails_a_month: 1000000 },
        { price_per_email: 0.00015, emails_a_month: 5000000 },
        { price_per_email: 0.0001, emails_a_month: Number.MAX_VALUE }
      ]
    },

    {
      name: 'Postmark',
      url: 'https://postmarkapp.com/pricing',
      image: 'postmark.png',
      notes: 'Free trial comes with 25,000 credits',
      prices: [
        { price_per_email: 0.0015, emails_a_month: 1000 },
        { price_per_email: 0.001, emails_a_month: 500000 },
        { price_per_email: 0.00075, emails_a_month: 1000000 },
        { price_per_email: 0.0005, emails_a_month: 2000000 }
      ]
    },

    {
      name: 'LeaderSend',
      url: 'http://www.leadersend.com/pricing',
      image: 'leadersend.png',
      notes: '',
      prices: [
        { price_per_email: 0.0002, emails_a_month: 50000 },
        { price_per_email: 0.00019, emails_a_month: 100000 },
        { price_per_email: 0.00018, emails_a_month: 500000 },
        { price_per_email: 0.00017, emails_a_month: 1000000 },
        { price_per_email: 0.00015, emails_a_month: 2000000 },
        { price_per_email: 0.0001, emails_a_month: 5000000 }
      ]
    },

    {
      name: 'Mailjet',
      url: 'https://www.mailjet.com/pricing/v3',
      image: 'mailjet.png',
      notes: '',
      free: 6000,
      prices: [
        { price_per_month: 7.49, emails_a_month: 30000 },
        { price_per_month: 74.95, emails_a_month: 120000 },
        { price_per_month: 199.95, emails_a_month: 350000 },
        { price_per_month: 399.95, emails_a_month: 750000 },
        { price_per_month: 799.95, emails_a_month: 2500000 }
      ]
    },

    {
      name: 'Elastic Email',
      url: 'https://elasticemail.com/pricing',
      image: 'elastic-email.png',
      notes: 'First 1,000 emails are free.',
      prices: [
        { price_per_email: 0.00099, emails_a_month: 1000 },
        { price_per_email: 0.00059, emails_a_month: 10000 },
        { price_per_email: 0.00039, emails_a_month: 50000 },
        { price_per_email: 0.00019, emails_a_month: 100000 },
        { price_per_email: 0.00009, emails_a_month: 500000 }
      ]
    },

    {
      name: 'SparkPost',
      url: 'https://www.sparkpost.com/pricing',
      image: 'sparkpost.png',
      notes: 'No credit card required, but overage not available.',
      free: 100000,
      prices: [
        { price_per_month: 79, emails_a_month: 10000 },
        { price_per_month: 199, emails_a_month: 40000 },
        { price_per_month: 399, emails_a_month: 100000 }
      ]
    }
  ];

  return services;
});

// module.exports = app;