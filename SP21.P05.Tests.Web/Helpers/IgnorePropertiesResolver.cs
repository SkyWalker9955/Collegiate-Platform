using System.Collections.Generic;
using System.Reflection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace SP21.P05.Tests.Web.Helpers
{
    public class IgnorePropertiesResolver : DefaultContractResolver
    {
        private readonly HashSet<string> nameIgnores = new HashSet<string>();

        public void IgnorePropertyByName(params string[] jsonPropertyNames)
        {
            foreach (var jsonPropertyName in jsonPropertyNames)
            {
                nameIgnores.Add(jsonPropertyName);
            }
        }

        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
        {
            var property = base.CreateProperty(member, memberSerialization);
            if (!IsIgnored(property.PropertyName))
            {
                return property;
            }

            property.ShouldSerialize = i => false;
            property.Ignored = true;

            return property;
        }

        private bool IsIgnored(string jsonPropertyName)
        {
            return nameIgnores.Contains(jsonPropertyName);
        }
    }
}