using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework5_10.Data
{
    public class ReactPeopleDbContext : DbContext 
    {
    
            private string _connectionString;

            public ReactPeopleDbContext(string connectionString)
            {
                _connectionString = connectionString;
            }

            protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            {
                optionsBuilder.UseSqlServer(_connectionString);
            }

            public DbSet<Person> People { get; set; }
        
    }
}
