using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework5_10.Data
{
    public class ReactPeopleRepository
    {

        private string _connectionString;

        public ReactPeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

  

        public List<Person> GetAll()
        {
            using var context = new ReactPeopleDbContext(_connectionString);
            return context.People.ToList();
        }

        public void Add(Person person)
        {
            using var context = new ReactPeopleDbContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public void Edit(Person person)
        {
            using var context = new ReactPeopleDbContext(_connectionString);
            context.People.Attach(person);
            context.Entry(person).State = EntityState.Modified;
            context.SaveChanges();
        }

        public void Delete(List<int> ids)
        {
            using var context = new ReactPeopleDbContext(_connectionString);
            foreach (var id in ids)
            {
                context.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {id}");
            }
        }

    }
}
