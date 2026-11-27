import type { BlogPost } from "../types/blog";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "scaling-systems-how-engineers-handle-growth-without-overengineering",
    title: "Scaling Systems: How Engineers Handle Growth Without Overengineering",
    description:
      "Understanding the engineering decisions behind scalable servers, databases, load balancers, and distributed systems.",
    date: "26 Nov 2026",
    readingTime: "9 min read",
    tags: ["Backend", "Scalability", "System Design", "Distributed Systems", "Caching"],
    content: `Scaling isn't about throwing more servers at a problem or building a complicated distributed architecture from day one. It's about understanding how systems behave under pressure, identifying their limitations, and making the right engineering decisions at the right time.

In this article, we'll explore the principles and mental models behind building scalable systems.

## 01. What Does Scaling Actually Mean?

Most applications begin with a relatively simple architecture:

- One application server
- One database
- A small number of users

Everything works fine until the application starts gaining traction. As traffic increases, response times get longer, database queries become slower, requests start failing, and infrastructure struggles to keep up.

Scaling is the process of increasing a system's ability to handle growing workloads while maintaining acceptable performance and reliability.

The objective isn't simply to support more users. It's to make growth manageable, predictable, and cost-efficient.

## 02. Find the Bottleneck Before Scaling

Before upgrading infrastructure or introducing new architectural components, ask yourself one question: **What is actually slowing down the system?**

A slow application doesn't necessarily mean you need more servers. The problem could be:

- Expensive database queries
- High CPU utilization
- Insufficient memory
- Network bandwidth limitations
- Excessive request queuing
- Slow external services

Imagine adding five application servers when the actual bottleneck is an inefficient database query. You've increased infrastructure costs without solving the underlying problem.

This is why monitoring and measurement come before scaling. Identify the bottleneck, understand its cause, and address it directly.

## 03. Start With Vertical Scaling

Distributed architectures are interesting, but they aren't always necessary. Sometimes, the simplest solution is to upgrade the machine you're already using.

Vertical scaling, also known as **scaling up**, involves increasing the resources available to a single machine.

This could mean:

- More CPU cores
- Additional RAM
- Faster storage
- Greater network bandwidth

Vertical scaling is attractive because it requires relatively few architectural changes. Your application can continue running with the same underlying design while benefiting from more powerful hardware.

However, it has limitations. Hardware has an upper limit. Larger machines can become disproportionately expensive. Upgrades may require downtime, and a single machine can remain a single point of failure.

Eventually, upgrading one machine becomes less practical than distributing the workload across multiple machines. That's where horizontal scaling comes in.

## 04. Horizontal Scaling: Distributing the Workload

Horizontal scaling, or **scaling out**, means adding more machines rather than making an existing machine more powerful. Instead of running your application on one server, you run multiple instances of it.

This increases capacity and can improve availability, but it also introduces new challenges.

How should requests be distributed? What happens when a server fails? Where should user sessions be stored? How do multiple servers access consistent data?

Horizontal scaling is as much an architectural decision as an infrastructure decision.

### Stateless Services

One of the easiest ways to make application servers horizontally scalable is to keep them stateless.

Consider an application that stores login sessions directly in a server's memory. If a user logs in through Server A and their next request reaches Server B, Server B may not recognize their session.

Instead, session information can be stored externally in a shared database, distributed cache, or an appropriate token-based authentication system.

Now, any server can process the user's request. Servers become easier to replace, restart, deploy, and scale independently.

### Autoscaling

Traffic rarely remains constant throughout the day. An application might experience increased demand during business hours, product launches, marketing campaigns, or major events.

Provisioning infrastructure for peak traffic at all times is expensive.

Autoscaling solves this by dynamically adjusting the number of running instances based on metrics such as:

- CPU utilization
- Request rate
- Queue length
- Resource utilization

When demand increases, additional instances are created. When demand decreases, unnecessary instances are removed. The goal is to balance performance with infrastructure costs.

However, autoscaling isn't instantaneous. Instance startup times, application initialization, and downstream database capacity must also be considered.

## 05. Load Balancers: Managing Incoming Traffic

Once an application runs across multiple servers, something needs to decide where incoming requests should go. That's the responsibility of a load balancer.

A load balancer sits between clients and backend servers, distributing incoming traffic across available instances.

Load balancers do more than distribute requests. They can also perform health checks, remove unhealthy instances from rotation, route requests based on paths or regions, and distribute traffic between application versions during deployments.

Two common load-balancing algorithms are:

**Round Robin:** Requests are distributed sequentially across available servers.

**Least Connections:** Requests are forwarded to the server with the fewest active connections.

The appropriate strategy depends on the workload. Round robin works well when requests have similar processing costs, while least connections can be useful when connection durations vary significantly.

From the client's perspective, the backend appears as a single service, regardless of how many servers are running behind it.

## 06. Scaling the Database

Adding application servers is relatively straightforward when services are stateless. Scaling databases is more complicated because databases maintain persistent state and must handle concerns such as consistency, durability, and concurrent access.

For many applications, the database eventually becomes a major bottleneck.

### Reduce Read Pressure

Many applications perform significantly more reads than writes. Consider an e-commerce platform. Thousands of users may view a product, while only a small percentage actually purchase it.

Fetching the same product information repeatedly creates unnecessary database load.

Common approaches to reducing read pressure include:

- Caching frequently accessed data
- Introducing read replicas
- Creating appropriate indexes
- Optimizing expensive queries
- Eliminating unnecessary database requests

Read replicas allow read operations to be distributed across additional database instances.

However, replicas may lag behind the primary database. Applications must account for situations where recently updated data isn't immediately visible on a replica.

### Make Writes Efficient

Writes are generally more difficult to scale because they modify shared state. Before introducing complex database architectures, improve how the application performs write operations.

Useful techniques include:

- Batching multiple operations
- Using queues for asynchronous processing
- Avoiding unnecessarily long transactions
- Reducing redundant updates
- Selectively denormalizing data

Write queues are particularly useful when requests arrive faster than a database can comfortably process them.

Instead of forcing the database to handle every operation immediately, a queue allows background workers to process suitable operations at a controlled rate.

Not every write can be asynchronous, however. Operations requiring immediate confirmation or strong consistency need different handling.

### Partitioning and Sharding

When a database becomes too large for a single instance to handle efficiently, distributing its data may become necessary.

**Partitioning** divides a dataset into smaller sections. **Sharding** distributes those sections across multiple database instances.

Each shard manages a subset of the overall dataset. This allows storage and workloads to be distributed across multiple machines.

But sharding introduces significant complexity:

- Choosing an effective shard key
- Preventing uneven data distribution
- Handling cross-shard queries
- Maintaining consistency
- Rebalancing data as the system grows

Sharding is powerful, but it should solve a demonstrated problem rather than an anticipated one.

## 07. Caching: Avoid Doing the Same Work Twice

One of the most effective ways to improve system performance is to avoid unnecessary computation and database access. That's the idea behind caching.

Imagine thousands of users requesting the same product information. Instead of querying the database every time, the application can temporarily store the result in a fast cache.

When requested data exists in the cache, the application can return it without accessing the database. This reduces latency and database load.

However, effective caching requires more than introducing Redis or another in-memory store.

Engineers must consider:

- How long cached data should remain valid
- When cached entries should be invalidated
- How to handle outdated data
- What happens when the cache becomes unavailable
- How to prevent simultaneous cache misses from overwhelming the database

An important metric is the **cache hit ratio**, the percentage of cache lookups successfully served from the cache.

A high cache hit ratio can significantly reduce infrastructure requirements, provided the cached data meets the application's freshness requirements.

## 08. Design for Failure

As systems grow, failures become increasingly unavoidable. Servers crash. Networks become unreliable. Databases slow down. External services become unavailable.

The objective isn't to eliminate every possible failure. It's to prevent individual failures from becoming system-wide outages.

Several patterns help achieve this:

- **Timeouts:** Prevent slow dependencies from blocking requests indefinitely.
- **Retries:** Retry temporary failures using controlled delays, exponential backoff, and appropriate limits.
- **Circuit Breakers:** Temporarily stop sending requests to a failing dependency, allowing it time to recover.
- **Graceful Degradation:** Keep essential functionality available even when secondary features fail.
- **Fallback Responses:** Return cached or simplified data when live information is temporarily unavailable.
- **Redundancy:** Maintain multiple instances of critical components so that individual failures don't make the entire system unavailable.

For example, if a recommendation service becomes unavailable, an e-commerce platform should still allow users to browse products and complete purchases.

Recommendations are useful. Checkout is essential. Understanding that distinction is an important part of designing resilient systems.

## 09. Observability: Understand What Your System Is Doing

You cannot make effective scaling decisions without understanding how your system behaves in production.

Observability provides the information necessary to investigate problems, identify bottlenecks, and understand failures.

It is commonly built around three pillars:

- **Logs:** Record application events, errors, and important activities.
- **Metrics:** Provide numerical measurements such as CPU utilization, request throughput, memory usage, latency, and error rates.
- **Traces:** Show how individual requests travel across different services and dependencies.

Together, they help engineers answer questions such as:

- Which service is experiencing increased latency?
- Which database queries are consuming the most resources?
- Why are requests failing?
- Where is the system spending most of its processing time?
- Is additional infrastructure actually improving performance?

Metrics such as p95 and p99 latency are particularly useful because average response times can hide poor experiences affecting a smaller percentage of users.

Good observability turns scaling from guesswork into an evidence-driven engineering process.

## 10. Develop a Mental Model for Scaling

The most important lesson in scaling is that different components have different limitations.

Application servers may need horizontal scaling. Databases may need better indexes, caching, or read replicas. Background workloads may need queues and additional workers. Static assets may need a content delivery network.

There is no single architecture that solves every scaling problem.

Avoid introducing infrastructure simply because large technology companies use it. A startup serving thousands of users has different requirements from a platform serving hundreds of millions.

Architecture should evolve alongside the workload, business requirements, and engineering team's capacity.

## Final Thoughts

Every scaling decision comes with a trade-off. Vertical scaling offers simplicity but has hardware limitations. Horizontal scaling increases capacity but introduces coordination challenges. Read replicas improve read throughput but introduce replication lag. Caching improves performance but creates invalidation problems. Sharding distributes data but increases operational complexity.

Even autoscaling can become ineffective when the actual bottleneck exists somewhere else.

Good system design isn't about knowing the largest number of architectural patterns. It's about understanding when to use them, why they work, and what problems they introduce.

Start simple. Measure continuously. Optimize where necessary. Introduce complexity only when its benefits justify its cost.

**The best architecture isn't the most sophisticated one. It's the simplest architecture that reliably satisfies your system's requirements.**`,
  },
  {
    slug: "queues-and-workers-with-bullmq-and-redis",
    title: "Designing Reliable Background Queues with BullMQ and Redis",
    description:
      "Lessons from building SourceSurf's scraping and webhook ingestion pipeline — retries, backoff, rate limits, and keeping PostgreSQL from choking under burst load.",
    date: "14 Oct 2026",
    readingTime: "6 min read",
    tags: ["Backend", "Redis", "BullMQ", "Architecture"],
    content: `When you first build an API endpoint that scrapes or enriches external data, running it synchronously inside the request handler feels fine for ten users. At a hundred concurrent requests, timeouts and rate limits show up fast.

Moving that work into a queue changes how you think about failure. Nothing is instant anymore, and everything has to survive restarts.

## Separating Ingestion from Processing

Your HTTP layer should do the absolute minimum work required to validate a payload and enqueue a job. Returning \`202 Accepted\` with a job identifier lets the client move on while workers handle slow external I/O.

In SourceSurf, GitHub metadata syncs and webhook events go straight into dedicated Redis-backed queues. Each queue isolates one class of work so a spike in repository scraping never delays user-facing notifications.

## Retries, Backoff, and Idempotency

External APIs fail in predictable ways: transient 502s, rate-limit headers, and socket resets. Configuring exponential backoff in BullMQ prevents workers from hammering a struggling upstream service.

Just as important is making every job idempotent. If a worker crashes halfway through writing a batch of records and BullMQ retries the job, using deterministic keys and \`ON CONFLICT\` upserts in PostgreSQL ensures you never create duplicate rows.

## Guarding the Database Pool

A fleet of eager workers can easily exhaust database connections long before CPU becomes a bottleneck. Keep worker concurrency bounded relative to your PostgreSQL connection pool size, and batch metadata writes instead of firing one query per item.`,
  },
  {
    slug: "end-to-end-typesafety-in-fullstack-typescript",
    title: "End-to-End Type Safety Between Next.js and Express",
    description:
      "How sharing contracts, Zod schemas, and strict TypeScript boundaries eliminates entire classes of integration bugs without overengineering your stack.",
    date: "22 Aug 2026",
    readingTime: "5 min read",
    tags: ["TypeScript", "Next.js", "Express", "Full-Stack"],
    content: `Most full-stack bugs do not happen inside complex algorithms. They happen at the boundary where the backend renames a field and the frontend keeps reading the old property name until runtime.

You do not need a heavy code-generation pipeline to prevent that. Shared runtime schemas and strict TypeScript types get you most of the value with almost zero ceremony.

## Validate at the Edge with Zod

Types disappear at runtime. Every request body, query parameter, and environment variable entering an Express service should pass through a Zod schema first.

From that single schema, you derive the TypeScript type via \`z.infer<typeof Schema>\` and export it to your frontend client. Both sides agree on exact field shapes and optionality by construction.

## Modeling Nested Domain Data

While building Quorum, threaded discussions meant responses carried recursive comment trees, vote counts, and author metadata. Defining explicit response DTO types prevented UI components from relying on accidental database columns.

Keeping transport types separate from raw database row types also gives you room to evolve SQL tables without breaking every page component at once.`,
  },
  {
    slug: "postgresql-patterns-that-matter-in-production",
    title: "PostgreSQL Indexing and Query Patterns That Actually Matter",
    description:
      "A practical look at composite indexes, N+1 elimination, and keeping latency predictable as tables grow past the first hundred thousand rows.",
    date: "03 Jun 2026",
    readingTime: "7 min read",
    tags: ["PostgreSQL", "Databases", "Performance"],
    content: `During local development with fifty seed rows, almost every query completes in under two milliseconds. Production datasets are less forgiving.

Learning how to read \`EXPLAIN (ANALYZE, BUFFERS)\` output early saves hours of guessing once real traffic arrives.

## Index for Your Real Filter + Sort Order

Single-column indexes look neat in migrations, but queries almost always filter on one column and sort by another. A composite index matching \`WHERE status = ? ORDER BY created_at DESC\` lets PostgreSQL walk the index directly without an extra sort step.

Pay attention to column order in composite indexes: put equality predicates first and range or sort columns afterward.

## Avoiding Accidental N+1 Queries

ORM abstractions make it easy to fetch a list of items and then lazily look up related counts in a loop. Replacing those loops with a single \`LEFT JOIN\` or \`GROUP BY\` aggregation cuts round-trip overhead dramatically.

Measure query counts per request in development so regressions show up before they hit staging.`,
  },
  {
    slug: "minimal-interfaces-and-sweating-the-details",
    title: "Why Quiet Interfaces Outlast Flashy Redesigns",
    description:
      "Notes on typography, spacing, removing decorative chrome, and letting hierarchy do the work.",
    date: "19 Apr 2026",
    readingTime: "4 min read",
    tags: ["Design", "Frontend", "UI"],
    content: `It is tempting to fill every empty pixel with borders, dashed dividers, glowing badges, and entrance animations. Usually, those additions compensate for weak spacing and unclear hierarchy.

When you strip away the extra lines and cards, every decision about font size, contrast, and vertical rhythm becomes visible.

## Typography Carries Structure

Consistent type scale and restrained contrast do more for scannability than boxes around every section. Pairing clear headings with generous whitespace tells the reader where sections start and end without drawing a rule between them.

## Motion Should Earn Its Keep

Subtle hover transitions feel responsive; slow blur entrances on every paragraph just delay reading. Keep the page fast, readable, and calm so the actual work takes center stage.`,
  },
  {
    slug: "what-happens-when-you-visit-a-website",
    title: "What Happens When You Visit a Website?",
    description:
      "A step-by-step walkthrough of what happens behind the scenes when you type a URL into your browser — DNS, TCP handshake, HTTP, and TLS.",
    date: "23 Nov 2025",
    readingTime: "3 min read",
    tags: ["Networking", "Web", "HTTP", "TCP", "TLS"],
    content: `Every time you enter a URL into your browser, several networking protocols work together to retrieve the requested webpage. Although it feels instant, multiple networking steps take place between your browser and the web server. Let's break down how these layers work together to retrieve a simple web page over HTTP on TCP.

## 1. DNS Resolution

Computers only understand IP addresses to communicate over the internet. Humans prefer memorable domain names such as \`example.com\`.

First, we use the [Domain Name System (DNS)](https://en.wikipedia.org/wiki/Domain_Name_System) to convert a human-readable domain name like youtube.com into an IP address like 32.42.52.62.

Then, a series of carefully orchestrated steps begins. We set up a TCP connection over IP, send our HTTP request, get a response, and tear down the connection.

## 2. Establishing a TCP Connection

Before sending an HTTP request over TCP, the client establishes a connection with the server using a three-way handshake.

**TCP Handshake:** The client initiates a TCP connection with the server using a three-way handshake:

- **SYN:** The client sends a SYN (synchronize) packet to the server to request a connection.
- **SYN-ACK:** The server responds with a SYN-ACK (synchronize-acknowledge) packet to acknowledge the request.
- **ACK:** The client sends an ACK (acknowledge) packet to establish the connection.

## 3. HTTP Request

Once the TCP connection is established, the client sends an HTTP GET request to the server to request the web page.

~~~
GET / HTTP/1.1
Host: example.com
Accept: text/html
~~~

## 4. Server Processing

After receiving and parsing the request, the server determines how to handle it. The server processes the request, retrieves the requested web page, and prepares an HTTP response. Depending on the application, the server might retrieve a static HTML file, query a database, execute application logic, or call another service.

## 5. Returning the HTTP Response

Once the server has processed the request, it sends an HTTP response to the client.

For example:

~~~
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 44
~~~

~~~
<html><body>Hello, world!</body></html>
~~~

This example contains a status line, response headers, a blank line, and an HTML body.

## 6. TCP Teardown

When the connection is no longer needed, either endpoint can initiate its closure. A typical TCP connection shutdown involves exchanging FIN and ACK segments.

- **FIN:** The client sends a FIN (finish) packet to the server to terminate the connection.
- **ACK:** The server acknowledges the FIN packet with an ACK.
- **FIN:** The server sends a FIN packet to the client to terminate its side of the connection.
- **ACK:** The client acknowledges the server's FIN packet with an ACK.

## Securing Internet Communication with SSL/TLS

So far, we've described HTTP communication over TCP without discussing encryption. When a website uses HTTPS, TLS adds a security layer to protect communication between the client and server.

SSL/TLS is a protocol used to encrypt data being transmitted over the internet. It is commonly used to provide secure connections for applications such as web browsers, email clients, and file transfer programs.

When using SSL/TLS to secure internet communication, there are a few key concepts to understand:

- **Certificates:** SSL/TLS certificates are used to establish trust between the client and server. They contain information about the identity of the server and are signed by a trusted third party (a Certificate Authority) to verify their authenticity.
- **Handshake:** During the SSL/TLS handshake process, the client and server exchange information to negotiate the encryption algorithm and other parameters for the secure connection.
- **Encryption:** Once the secure connection is established, data is encrypted using the agreed-upon algorithm and can be transmitted securely between the client and server.`,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}