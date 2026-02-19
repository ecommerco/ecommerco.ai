import { Navbar } from "@/components/Navbar";
import { CallToAction } from "@/components/CallToAction";
import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";

const helpArticles: Record<string, {
  title: string;
  content: string;
  category: string;
  readTime: string;
}> = {
  "how-do-i-set-up-my-store": {
    title: "How do I set up my store?",
    category: "Getting Started",
    readTime: "5 min read",
    content: `
# How do I set up my store?

Setting up your Ecommerco store is quick and easy. Follow these steps to get started:

## Step 1: Create Your Account

1. Go to [ecommerco.ai/signup](https://ecommerco.ai/signup)
2. Enter your email address and create a password
3. Verify your email address
4. Complete your profile information

## Step 2: Initialize Your Store

1. Click on "Initialize Store" from your dashboard
2. Enter your store name
3. Choose your store subdomain (e.g., mystore.ecommerco.ai)
4. Select your industry and business type

## Step 3: Configure Basic Settings

1. **Store Information**: Add your store description, logo, and contact information
2. **Payment Methods**: Set up payment gateways (PayPal, Stripe, etc.)
3. **Shipping**: Configure shipping zones and rates
4. **Taxes**: Set up tax rates for your regions

## Step 4: Customize Your Store

1. **Theme Selection**: Choose a theme from our library or create a custom one
2. **Pages**: Create essential pages (About, Contact, Privacy Policy, etc.)
3. **Navigation**: Set up your store menu and navigation
4. **Branding**: Customize colors, fonts, and logo

## Step 5: Add Your First Product

1. Go to Products → Add Product
2. Upload product images
3. Add product details (name, description, price)
4. Set inventory and variants
5. Publish your product

## Step 6: Launch Your Store

1. Review all settings
2. Test your checkout process
3. Connect your custom domain (optional)
4. Go live!

## Need Help?

If you encounter any issues during setup, our AI agent is available 24/7 to assist you. Just click the chat icon in the bottom right corner.

## Related Articles

- [How to add products?](/help/how-to-add-products)
- [How to configure payments?](/help/how-to-configure-payments)
- [How to customize my theme?](/help/how-to-customize-my-theme)
    `
  },
  "how-to-add-products": {
    title: "How to add products?",
    category: "Store Management",
    readTime: "4 min read",
    content: `
# How to add products?

Adding products to your Ecommerco store is simple. Here's how:

## Method 1: Manual Entry

1. Go to **Products** → **Add Product**
2. Enter product name and description
3. Upload product images (you can upload multiple images)
4. Set the price and compare-at price (if applicable)
5. Add product variants (size, color, etc.)
6. Set inventory quantities
7. Add SEO information
8. Click **Save and Publish**

## Method 2: AI-Powered Product Creation

1. Go to **Products** → **AI Create Product**
2. Upload a product image
3. Tell the AI agent about your product (e.g., "iPhone 17, $1000")
4. The AI will automatically:
   - Enhance the image quality
   - Generate product description
   - Extract features and specifications
   - Optimize for SEO
5. Review and publish

## Method 3: Bulk Import

1. Go to **Products** → **Import**
2. Download the CSV template
3. Fill in your product data
4. Upload the CSV file
5. Review and import

## Product Images

- Recommended size: 1200x1200px
- Supported formats: JPG, PNG, WebP
- Maximum file size: 10MB per image
- You can add up to 10 images per product

## Product Variants

Create variants for products with different:
- Sizes (S, M, L, XL)
- Colors (Red, Blue, Green)
- Materials (Cotton, Polyester)
- Any custom option

## Inventory Management

- Set stock quantities for each variant
- Enable low stock alerts
- Track inventory automatically
- Set up inventory locations

## Related Articles

- [How do I set up my store?](/help/how-do-i-set-up-my-store)
- [How to manage inventory?](/help/how-to-manage-inventory)
- [How to use the AI Agent?](/help/how-to-use-the-ai-agent)
    `
  },
  "how-to-configure-payments": {
    title: "How to configure payments?",
    category: "Getting Started",
    readTime: "6 min read",
    content: `
# How to configure payments?

Setting up payment methods allows customers to purchase from your store. Here's how:

## Supported Payment Methods

- **PayPal**: Accept PayPal and credit card payments
- **Stripe**: Accept all major credit cards
- **Bank Transfer**: Direct bank transfers
- **Cash on Delivery**: For local deliveries
- **Regional Methods**: Various local payment options

## Setting Up PayPal

1. Go to **Settings** → **Payments**
2. Click **Add Payment Method** → **PayPal**
3. Connect your PayPal account
4. Enable PayPal Express Checkout
5. Set up webhooks for order notifications
6. Test the payment flow

## Setting Up Stripe

1. Go to **Settings** → **Payments**
2. Click **Add Payment Method** → **Stripe**
3. Enter your Stripe API keys (found in Stripe Dashboard)
4. Configure payment methods (cards, Apple Pay, Google Pay)
5. Set up webhooks
6. Test transactions

## Payment Settings

- **Currency**: Set your store's default currency
- **Payment Terms**: Configure payment terms for B2B customers
- **Refund Policy**: Set up automatic refund rules
- **Payment Security**: Enable 3D Secure for additional security

## Testing Payments

Use test mode to verify your payment setup:
- PayPal Sandbox for testing
- Stripe Test Mode
- Test credit card numbers provided

## Related Articles

- [How do I set up my store?](/help/how-do-i-set-up-my-store)
- [How to manage orders?](/help/how-to-manage-orders)
    `
  },
  "how-to-use-the-ai-agent": {
    title: "How to use the AI Agent?",
    category: "AI Features",
    readTime: "5 min read",
    content: `
# How to use the AI Agent?

The AI Agent is your intelligent assistant that helps you manage your store. Here's how to use it:

## Accessing the AI Agent

1. Click the chat icon in the bottom right corner
2. Or go to **Dashboard** → **AI Agent**
3. Start talking or typing your request

## Voice Commands

You can speak to the AI Agent just like ChatGPT:

- "Create a product for iPhone 17, price $1000"
- "Show me today's sales"
- "Create an ad campaign for my best-selling product"
- "Update my store theme"
- "What's my store performance?"

## Text Commands

Type your requests in natural language:

- "Add a new product category called Electronics"
- "Generate a blog post about summer fashion"
- "Analyze my sales data"
- "Set up email marketing campaign"

## AI Agent Features

### Store Management
- Create and edit products
- Manage inventory
- Update store settings
- Generate content

### Analytics & Insights
- Sales analysis
- Customer insights
- Performance reports
- Trend predictions

### Marketing
- Create ad campaigns
- Generate marketing content
- Schedule social media posts
- Optimize SEO

### Automation
- Auto-respond to customers
- Process orders
- Manage inventory
- Handle returns

## Tips for Best Results

1. Be specific in your requests
2. Use natural language
3. Ask follow-up questions
4. Review AI suggestions before applying

## Related Articles

- [How to add products?](/help/how-to-add-products)
- [How to create ad campaigns?](/help/how-to-create-ad-campaigns)
    `
  },
  "how-to-customize-my-theme": {
    title: "How to customize my theme?",
    category: "Design & Themes",
    readTime: "7 min read",
    content: `
# How to customize my theme?

Customize your store's appearance to match your brand. Here's how:

## Theme Selection

1. Go to **Design** → **Themes**
2. Browse our theme library
3. Preview themes before applying
4. Click **Apply Theme**

## Customizing Your Theme

### Colors & Branding
1. Go to **Design** → **Customize**
2. Click **Colors**
3. Set your brand colors:
   - Primary color
   - Secondary color
   - Background colors
   - Text colors
4. Upload your logo
5. Set typography

### Layout Customization
1. Use the visual editor
2. Drag and drop sections
3. Rearrange page elements
4. Add or remove sections
5. Preview changes in real-time

### Custom CSS
1. Go to **Design** → **Customize** → **Advanced**
2. Add custom CSS code
3. Preview changes
4. Save when satisfied

## Page Builder

1. Go to **Pages** → **Edit Page**
2. Use the drag-and-drop builder
3. Add sections:
   - Hero sections
   - Product grids
   - Image galleries
   - Text blocks
   - Forms
4. Customize each section
5. Save and publish

## Mobile Optimization

1. Preview mobile view
2. Adjust mobile-specific settings
3. Test on different devices
4. Optimize images for mobile

## Related Articles

- [How do I set up my store?](/help/how-do-i-set-up-my-store)
- [How to use the page builder?](/help/how-to-use-the-page-builder)
    `
  },
  "how-to-track-orders": {
    title: "How to track orders?",
    category: "Store Management",
    readTime: "3 min read",
    content: `
# How to track orders?

Track and manage all your orders from one place:

## Viewing Orders

1. Go to **Orders** in your dashboard
2. See all orders with status, date, and total
3. Filter by status, date, or customer
4. Search for specific orders

## Order Status

- **Pending**: Payment pending
- **Processing**: Order being prepared
- **Shipped**: Order shipped
- **Delivered**: Order delivered
- **Cancelled**: Order cancelled
- **Refunded**: Order refunded

## Updating Order Status

1. Click on an order
2. Update the status
3. Add tracking number
4. Send notification to customer

## Order Details

View complete order information:
- Customer details
- Products ordered
- Payment information
- Shipping address
- Order history

## Related Articles

- [How to manage orders?](/help/how-to-manage-orders)
- [How to process refunds?](/help/how-to-process-refunds)
    `
  },
  "how-to-set-up-shipping": {
    title: "How to set up shipping?",
    category: "Store Management",
    readTime: "5 min read",
    content: `
# How to set up shipping?

Configure shipping options for your store:

## Shipping Zones

1. Go to **Settings** → **Shipping**
2. Click **Add Shipping Zone**
3. Select countries/regions
4. Set shipping rates

## Shipping Rates

### Flat Rate
- Set a fixed price for all orders
- Or per item/per order

### Weight-Based
- Calculate shipping by weight
- Set rates for different weight ranges

### Price-Based
- Free shipping over certain amount
- Tiered rates based on order value

## Shipping Carriers

Integrate with shipping carriers:
- DHL
- FedEx
- UPS
- USPS
- Local carriers

## Related Articles

- [How do I set up my store?](/help/how-do-i-set-up-my-store)
    `
  },
  "how-to-manage-inventory": {
    title: "How to manage inventory?",
    category: "Store Management",
    readTime: "4 min read",
    content: `
# How to manage inventory?

Keep track of your stock levels:

## Inventory Tracking

1. Go to **Products** → **Inventory**
2. See all products with stock levels
3. Set low stock alerts
4. Track inventory changes

## Stock Management

- Add stock manually
- Import stock from CSV
- Sync with suppliers
- Automatic deduction on orders

## Related Articles

- [How to add products?](/help/how-to-add-products)
    `
  },
  "how-to-create-your-first-store": {
    title: "How to create your first store",
    category: "Getting Started",
    readTime: "6 min read",
    content: `
# How to create your first store

Creating your first Ecommerco store is simple and takes just a few minutes.

## Getting Started

1. Sign up for an account at [ecommerco.ai](https://ecommerco.ai)
2. Verify your email address
3. Complete your profile setup

## Store Creation Process

1. Click **Create Store** from your dashboard
2. Enter your store name
3. Choose a subdomain (e.g., mystore.ecommerco.ai)
4. Select your business type and industry
5. Click **Create Store**

## Initial Setup

After creating your store, you'll need to:
- Add your store logo and branding
- Configure basic settings
- Set up payment methods
- Add your first product

## Related Articles

- [How do I set up my store?](/help/how-do-i-set-up-my-store)
- [How to add products?](/help/how-to-add-products)
    `
  },
  "setting-up-your-domain": {
    title: "Setting up your domain",
    category: "Getting Started",
    readTime: "5 min read",
    content: `
# Setting up your domain

Connect your custom domain to your Ecommerco store.

## Domain Requirements

- You need a domain name (e.g., mystore.com)
- Access to your domain's DNS settings
- Domain must be active and registered

## Steps to Connect

1. Go to **Settings** → **Domains**
2. Click **Add Custom Domain**
3. Enter your domain name
4. Follow the DNS configuration instructions
5. Add the required DNS records:
   - A record pointing to our IP
   - CNAME record for www subdomain
6. Wait for DNS propagation (usually 24-48 hours)
7. Verify domain connection

## SSL Certificate

SSL certificates are automatically provisioned for all connected domains, ensuring secure connections for your customers.

## Related Articles

- [How do I set up my store?](/help/how-do-i-set-up-my-store)
    `
  },
  "adding-your-first-product": {
    title: "Adding your first product",
    category: "Getting Started",
    readTime: "4 min read",
    content: `
# Adding your first product

Add your first product to start selling.

## Quick Start

1. Go to **Products** → **Add Product**
2. Enter product name
3. Add product description
4. Upload product images
5. Set price
6. Click **Publish**

## Detailed Steps

### Product Information
- Product name (required)
- Description (required)
- Product images (at least one)
- Price (required)

### Product Options
- Variants (size, color, etc.)
- Inventory tracking
- SEO settings
- Shipping information

## Related Articles

- [How to add products?](/help/how-to-add-products)
- [How to manage inventory?](/help/how-to-manage-inventory)
    `
  },
  "configuring-payment-methods": {
    title: "Configuring payment methods",
    category: "Getting Started",
    readTime: "6 min read",
    content: `
# Configuring payment methods

Set up payment methods to accept customer payments.

## Available Payment Methods

- PayPal
- Stripe (Credit Cards)
- Bank Transfer
- Cash on Delivery
- Regional payment gateways

## Setup Process

1. Go to **Settings** → **Payments**
2. Choose your payment method
3. Enter required credentials
4. Configure payment settings
5. Test the payment flow
6. Enable for live transactions

## Related Articles

- [How to configure payments?](/help/how-to-configure-payments)
    `
  },
  "managing-products": {
    title: "Managing products",
    category: "Store Management",
    readTime: "5 min read",
    content: `
# Managing products

Efficiently manage your product catalog.

## Product Management Features

- Add, edit, and delete products
- Bulk operations
- Product variants
- Inventory tracking
- SEO optimization
- Product categories and tags

## Best Practices

- Keep product descriptions detailed
- Use high-quality images
- Organize products into categories
- Set up inventory alerts
- Regularly update product information

## Related Articles

- [How to add products?](/help/how-to-add-products)
- [How to manage inventory?](/help/how-to-manage-inventory)
    `
  },
  "order-management": {
    title: "Order management",
    category: "Store Management",
    readTime: "5 min read",
    content: `
# Order management

Manage all your orders from one central location.

## Order Dashboard

View all orders with:
- Order status
- Customer information
- Order total
- Payment status
- Shipping information

## Order Actions

- View order details
- Update order status
- Process refunds
- Add tracking numbers
- Print invoices
- Export orders

## Order Statuses

- Pending
- Processing
- Shipped
- Delivered
- Cancelled
- Refunded

## Related Articles

- [How to track orders?](/help/how-to-track-orders)
    `
  },
  "customer-management": {
    title: "Customer management",
    category: "Store Management",
    readTime: "4 min read",
    content: `
# Customer management

Manage your customer relationships effectively.

## Customer Database

- View all customers
- Customer profiles
- Order history
- Contact information
- Customer segments

## Customer Communication

- Send emails
- Create customer groups
- Track customer lifetime value
- Manage customer accounts
- Handle customer support

## Related Articles

- [Order management](/help/order-management)
    `
  },
  "inventory-tracking": {
    title: "Inventory tracking",
    category: "Store Management",
    readTime: "4 min read",
    content: `
# Inventory tracking

Keep track of your stock levels automatically.

## Features

- Real-time inventory updates
- Low stock alerts
- Multi-location inventory
- Inventory reports
- Stock adjustments

## Setup

1. Enable inventory tracking for products
2. Set initial stock levels
3. Configure low stock alerts
4. Set up inventory locations (if needed)

## Related Articles

- [How to manage inventory?](/help/how-to-manage-inventory)
    `
  },
  "using-the-ai-agent": {
    title: "Using the AI Agent",
    category: "AI Features",
    readTime: "5 min read",
    content: `
# Using the AI Agent

Leverage AI to manage your store efficiently.

## Getting Started

1. Click the AI Agent icon
2. Start a conversation
3. Ask questions or give commands
4. Review AI suggestions

## Common Tasks

- Create products
- Generate content
- Analyze sales
- Create marketing campaigns
- Answer customer questions

## Related Articles

- [How to use the AI Agent?](/help/how-to-use-the-ai-agent)
    `
  },
  "voice-commands": {
    title: "Voice commands",
    category: "AI Features",
    readTime: "4 min read",
    content: `
# Voice commands

Control your store using voice commands.

## How It Works

1. Click the microphone icon
2. Speak your command
3. AI processes your request
4. Action is executed

## Example Commands

- "Create a product for iPhone 17"
- "Show me today's sales"
- "Create an ad campaign"
- "Update my store theme"

## Tips

- Speak clearly
- Be specific
- Use natural language
- Review before confirming

## Related Articles

- [How to use the AI Agent?](/help/how-to-use-the-ai-agent)
    `
  },
  "auto-product-creation": {
    title: "Auto product creation",
    category: "AI Features",
    readTime: "5 min read",
    content: `
# Auto product creation

Create products automatically using AI.

## How It Works

1. Upload a product image
2. Provide basic information
3. AI generates:
   - Product description
   - Features and specifications
   - SEO-optimized content
   - Product variants
4. Review and publish

## Benefits

- Save time
- Consistent quality
- SEO optimization
- Professional descriptions

## Related Articles

- [How to add products?](/help/how-to-add-products)
- [How to use the AI Agent?](/help/how-to-use-the-ai-agent)
    `
  },
  "smart-advertising": {
    title: "Smart advertising",
    category: "AI Features",
    readTime: "6 min read",
    content: `
# Smart advertising

Create and manage ad campaigns with AI assistance.

## Features

- AI-generated ad copy
- Audience targeting
- Budget optimization
- Performance tracking
- Multi-platform campaigns

## Creating Campaigns

1. Go to **Marketing** → **Ads**
2. Click **Create Campaign**
3. Choose campaign type
4. Let AI optimize targeting
5. Set budget
6. Launch campaign

## Related Articles

- [How to use the AI Agent?](/help/how-to-use-the-ai-agent)
    `
  },
  "customizing-your-theme": {
    title: "Customizing your theme",
    category: "Design & Themes",
    readTime: "7 min read",
    content: `
# Customizing your theme

Make your store unique with theme customization.

## Customization Options

- Colors and branding
- Typography
- Layout
- Sections
- Custom CSS

## Related Articles

- [How to customize my theme?](/help/how-to-customize-my-theme)
    `
  },
  "using-the-page-builder": {
    title: "Using the page builder",
    category: "Design & Themes",
    readTime: "6 min read",
    content: `
# Using the page builder

Create beautiful pages with our drag-and-drop builder.

## Getting Started

1. Go to **Pages** → **Add Page**
2. Choose a template or start blank
3. Drag and drop sections
4. Customize content
5. Publish

## Available Sections

- Hero sections
- Product grids
- Image galleries
- Text blocks
- Forms
- Testimonials
- Video embeds

## Related Articles

- [How to customize my theme?](/help/how-to-customize-my-theme)
    `
  },
  "adding-custom-css": {
    title: "Adding custom CSS",
    category: "Design & Themes",
    readTime: "5 min read",
    content: `
# Adding custom CSS

Add custom styling to your store.

## How to Add CSS

1. Go to **Design** → **Customize** → **Advanced**
2. Click **Custom CSS**
3. Enter your CSS code
4. Preview changes
5. Save

## Best Practices

- Use specific selectors
- Test on different devices
- Keep CSS organized
- Document your changes

## Related Articles

- [How to customize my theme?](/help/how-to-customize-my-theme)
    `
  },
  "mobile-optimization": {
    title: "Mobile optimization",
    category: "Design & Themes",
    readTime: "5 min read",
    content: `
# Mobile optimization

Ensure your store looks great on mobile devices.

## Mobile Features

- Responsive design
- Mobile-specific settings
- Touch-friendly navigation
- Optimized images
- Fast loading times

## Testing

1. Preview mobile view
2. Test on different devices
3. Check touch interactions
4. Verify image sizes
5. Test checkout process

## Related Articles

- [How to customize my theme?](/help/how-to-customize-my-theme)
    `
  }
};

export function generateStaticParams() {
  return Object.keys(helpArticles).map((slug) => ({
    slug: slug,
  }));
}

export default function HelpArticlePage({ params }: { params: { slug: string } }) {
  const article = helpArticles[params.slug];

  if (!article) {
    return (
      <main className="min-h-screen bg-black text-white selection:bg-primary/30 pt-20">
        <Navbar />
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
            <Link href="/help" className="text-primary hover:text-yellow-400">
              ← Back to Help Center
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30 pt-20">
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/help"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Help Center
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary">
                {article.category}
              </span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {article.title}
            </h1>
          </div>

          <div className="prose prose-invert max-w-none">
            <div 
              className="text-gray-300 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ 
                __html: article.content
                  .split('\n')
                  .map(line => {
                    if (line.startsWith('# ')) {
                      return `<h2 class="text-3xl font-bold text-white mt-8 mb-4">${line.substring(2)}</h2>`;
                    }
                    if (line.startsWith('## ')) {
                      return `<h3 class="text-2xl font-bold text-white mt-6 mb-3">${line.substring(3)}</h3>`;
                    }
                    if (line.startsWith('- ')) {
                      return `<li class="ml-6">${line.substring(2)}</li>`;
                    }
                    if (line.startsWith('1. ')) {
                      return `<li class="ml-6 list-decimal">${line.substring(3)}</li>`;
                    }
                    if (line.trim() === '') {
                      return '<br />';
                    }
                    if (line.includes('[') && line.includes('](')) {
                      const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
                      if (linkMatch) {
                        return `<p><a href="${linkMatch[2]}" class="text-primary hover:text-yellow-400">${linkMatch[1]}</a></p>`;
                      }
                    }
                    return `<p>${line}</p>`;
                  })
                  .join('')
              }}
            />
          </div>
        </div>
      </div>
      <CallToAction />
    </main>
  );
}
